insert into public.businesses (
  id, name, slug, address, phone, whatsapp_number, google_review_url, logo_url, primary_color, secondary_color
) values (
  '11111111-1111-4111-8111-111111111111',
  'SHARO KEBAB',
  'sharo-kebab',
  'Bulevardul Pache Protopopescu 101, Bucuresti',
  '+40 700 000 000',
  '40700000000',
  'https://www.google.com/search?q=SHARO+KEBAB+Bulevardul+Pache+Protopopescu+101+Bucuresti',
  '/sharo-logo.svg',
  '#ff7a1a',
  '#e12d21'
) on conflict (slug) do nothing;

insert into public.menu_items (business_id, name, category, description, price, is_featured) values
('11111111-1111-4111-8111-111111111111','Cheese Pui','Cheese Kebab','Pui rumenit, branza topita, sos SHARO si legume crocante.',29,true),
('11111111-1111-4111-8111-111111111111','Cheese Vita','Cheese Kebab','Vita suculenta, cascaval topit, sos rosu usor picant.',34,true),
('11111111-1111-4111-8111-111111111111','Cheese Berbecut','Cheese Kebab','Berbecut aromat, branza cremoasa si mix fresh.',36,true),
('11111111-1111-4111-8111-111111111111','Arabeasca Pui','Arabeasca','Lipie arabeasca presata, pui, cartofi si sosuri echilibrate.',31,true),
('11111111-1111-4111-8111-111111111111','Arabeasca Vita','Arabeasca','Vita frageda in lipie presata, textura crocanta si sos intens.',36,false),
('11111111-1111-4111-8111-111111111111','Arabeasca Berbecut','Arabeasca','Berbecut, condimente calde si lipie crocanta.',38,false),
('11111111-1111-4111-8111-111111111111','Shaorma Mare Pui','Shaorma','Portie generoasa pentru foame serioasa.',28,false),
('11111111-1111-4111-8111-111111111111','Shaorma Mare Vita','Shaorma','Vita, cartofi, salate si sos SHARO.',33,false),
('11111111-1111-4111-8111-111111111111','Falafel Cheese','Vegetarian','Falafel crocant cu branza si sos tahini.',27,false),
('11111111-1111-4111-8111-111111111111','Crispy Cheese','Crispy','Crispy strips, cheddar si sos dulce-picant.',30,false),
('11111111-1111-4111-8111-111111111111','Cartofi Prajiti','Side','Cartofi aurii, sare fina, sos optional.',12,true),
('11111111-1111-4111-8111-111111111111','Ayran','Bauturi','Ayran rece, perfect langa kebab.',8,true),
('11111111-1111-4111-8111-111111111111','Baclava cu Lapte','Desert','Desert rece, cremos, cu fistic si lapte.',17,true);

insert into public.offers (business_id, title, description, start_date, end_date, active) values
('11111111-1111-4111-8111-111111111111','Oferta zilei: 2 Arabeasca Pui + Ayran','Ia doua Arabeasca Pui si primesti Ayran rece din partea casei intre 14:00 si 17:00.',now(),now() + interval '1 day',true),
('11111111-1111-4111-8111-111111111111','Late night Cheese','Dupa 21:00, Cheese Pui vine cu extra sos SHARO inclus.',now(),now() + interval '7 days',true);

insert into public.staff_qr_tokens (business_id, token, active, expires_at, created_by)
values (
  '11111111-1111-4111-8111-111111111111',
  encode(gen_random_bytes(32), 'hex'),
  true,
  now() + interval '7 days',
  'seed'
);
