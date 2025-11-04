CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(500) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    specs JSONB DEFAULT '[]',
    in_stock BOOLEAN DEFAULT true,
    rating DECIMAL(2,1) DEFAULT 4.5,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_product_id ON products(product_id);

INSERT INTO products (product_id, name, price, category, image, description, specs, in_stock, rating, reviews)
VALUES 
('tri-1', 'EcoTrike City Pro', 450000, 'tricycles', 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg', 
 'Экологичный трехместный электротрицикл для города',
 '[{"label": "Макс. скорость", "value": "40 км/ч"}, {"label": "Мощность", "value": "800 Вт"}, {"label": "Вместимость", "value": "3 человека"}, {"label": "Запас хода", "value": "60 км"}]',
 true, 4.8, 127),

('tri-2', 'EcoTrike Delivery', 520000, 'tricycles', 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
 'Трицикл для доставки с увеличенным грузовым отсеком',
 '[{"label": "Макс. скорость", "value": "35 км/ч"}, {"label": "Мощность", "value": "1000 Вт"}, {"label": "Грузоподъемность", "value": "200 кг"}, {"label": "Запас хода", "value": "80 км"}]',
 true, 4.9, 89),

('car-1', 'ElectroCar Urban', 1200000, 'cars', 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
 'Компактный электромобиль для города',
 '[{"label": "Макс. скорость", "value": "90 км/ч"}, {"label": "Мощность", "value": "30 кВт"}, {"label": "Вместимость", "value": "4 человека"}, {"label": "Запас хода", "value": "250 км"}]',
 true, 4.7, 234),

('bike-1', 'E-Bike Mountain Pro', 85000, 'bicycles', 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
 'Электровелосипед для бездорожья',
 '[{"label": "Макс. скорость", "value": "32 км/ч"}, {"label": "Мощность", "value": "500 Вт"}, {"label": "Запас хода", "value": "70 км"}, {"label": "Вес", "value": "22 кг"}]',
 true, 4.6, 312),

('moto-1', 'ElectroMoto Sport', 380000, 'motorcycles', 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
 'Электромотоцикл спортивного класса',
 '[{"label": "Макс. скорость", "value": "120 км/ч"}, {"label": "Мощность", "value": "8 кВт"}, {"label": "Запас хода", "value": "150 км"}, {"label": "Вес", "value": "95 кг"}]',
 true, 4.9, 156),

('quad-1', 'ElectroQuad Adventure', 650000, 'quadricycles', 'https://cdn.poehali.dev/projects/ed195113-ae14-4f14-8feb-b641aaa2be50/files/0c06a269-7214-47a8-8c52-c93dd5dcb3d3.jpg',
 'Электроквадроцикл для активного отдыха',
 '[{"label": "Макс. скорость", "value": "70 км/ч"}, {"label": "Мощность", "value": "5 кВт"}, {"label": "Запас хода", "value": "100 км"}, {"label": "Вес", "value": "180 кг"}]',
 true, 4.8, 98)

ON CONFLICT (product_id) DO NOTHING;