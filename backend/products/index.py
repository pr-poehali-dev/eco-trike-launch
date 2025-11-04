import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    '''
    Business: Get database connection using DATABASE_URL env variable
    Returns: PostgreSQL connection object
    '''
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с товарами - получение списка, поиск, добавление, обновление
    Args: event - dict с httpMethod, queryStringParameters, body
          context - объект с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            product_id = params.get('id')
            category = params.get('category')
            
            if product_id:
                cur.execute(
                    'SELECT * FROM products WHERE product_id = %s',
                    (product_id,)
                )
                product = cur.fetchone()
                if not product:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Product not found'})
                    }
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(product), default=str)
                }
            
            if category:
                cur.execute(
                    'SELECT * FROM products WHERE category = %s ORDER BY created_at DESC',
                    (category,)
                )
            else:
                cur.execute('SELECT * FROM products ORDER BY created_at DESC')
            
            products = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(p) for p in products], default=str)
            }
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cur.execute('''
                INSERT INTO products 
                (product_id, name, price, category, image, description, specs, in_stock, rating, reviews)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
            ''', (
                body['product_id'],
                body['name'],
                body['price'],
                body['category'],
                body['image'],
                body.get('description', ''),
                json.dumps(body.get('specs', [])),
                body.get('in_stock', True),
                body.get('rating', 4.5),
                body.get('reviews', 0)
            ))
            
            product = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(product), default=str)
            }
        
        if method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            product_id = body.get('product_id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'product_id required'})
                }
            
            cur.execute('''
                UPDATE products SET
                    name = %s,
                    price = %s,
                    category = %s,
                    image = %s,
                    description = %s,
                    specs = %s,
                    in_stock = %s,
                    rating = %s,
                    reviews = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE product_id = %s
                RETURNING *
            ''', (
                body['name'],
                body['price'],
                body['category'],
                body['image'],
                body.get('description', ''),
                json.dumps(body.get('specs', [])),
                body.get('in_stock', True),
                body.get('rating', 4.5),
                body.get('reviews', 0),
                product_id
            ))
            
            product = cur.fetchone()
            conn.commit()
            
            if not product:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(product), default=str)
            }
        
        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            product_id = params.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'id parameter required'})
                }
            
            cur.execute('DELETE FROM products WHERE product_id = %s RETURNING product_id', (product_id,))
            deleted = cur.fetchone()
            conn.commit()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Product deleted', 'product_id': deleted['product_id']})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()
