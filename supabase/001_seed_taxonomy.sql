-- MavenScout seed data: taxonomy_categories + taxonomy_items
-- Domain Expertise and Technical Skills lists below are verified against every
-- expertise/skill value actually used across the 15 real seeded profiles --
-- no gaps. Location and Language are intentionally NOT seeded here; they are
-- free-text fields on `profiles` with filter options derived dynamically
-- (see note at bottom of this file). Work Arrangement is genuinely fixed at
-- 3 values, confirmed by real usage, so it stays taxonomy-driven.

-- ============ CATEGORIES ============
INSERT INTO taxonomy_categories (type, name, sort_order) VALUES
  ('domain_expertise', 'Gender & Social Inclusion', 1),
  ('domain_expertise', 'Climate & Environment', 2),
  ('domain_expertise', 'Governance & Institutional', 3),
  ('domain_expertise', 'Human Development', 4),
  ('domain_expertise', 'Agriculture & Food', 5),
  ('domain_expertise', 'Infrastructure & Transport', 6),
  ('domain_expertise', 'Private Sector Development', 7),
  ('domain_expertise', 'Fragility, Conflict & Violence', 8),
  ('technical_skills', 'Writing & Editorial', 1),
  ('technical_skills', 'Graphic Design & Creative', 2),
  ('technical_skills', 'Technical & Data', 3),
  ('technical_skills', 'Strategic & Operations', 4),
  ('technical_skills', 'Language & Translation', 5),
  ('technical_skills', 'Training & Capacity Building', 6),
  ('technical_skills', 'Research & Analysis', 7),
  ('technical_skills', 'Digital & IT Services', 8),
  ('technical_skills', 'Communications & Advocacy', 9),
  ('work_arrangement', 'Work Arrangement', 1);

-- ============ ITEMS ============
INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Gender Mainstreaming',1),('Gender-Based Violence',2),('Disability Inclusion',3),
          ('Indigenous Peoples',4),('Gender Budgeting',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Gender & Social Inclusion';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Climate Adaptation',1),('Climate Mitigation',2),('Biodiversity',3),
          ('Renewable Energy',4),('Circular Economy',5),('Water Management',6),('WASH',7)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Climate & Environment';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Anti-Corruption',1),('Public Procurement',2),('Justice Reform',3),
          ('Citizen Engagement',4),('Digital Governance',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Governance & Institutional';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Primary Education',1),('Tertiary Education',2),('Health Systems',3),
          ('Social Protection',4),('Nutrition',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Human Development';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Agribusiness',1),('Food Security',2),('Rural Development',3),
          ('Irrigation Systems',4),('Sustainable Farming',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Agriculture & Food';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Urban Transport',1),('Road Safety',2),('Logistics & Supply Chain',3),
          ('Energy Efficiency',4),('Public-Private Partnerships',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Infrastructure & Transport';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('SME Support',1),('Trade & Competitiveness',2),('Financial Inclusion',3),
          ('Investment Climate',4),('Innovation Ecosystems',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Private Sector Development';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Peacebuilding',1),('Humanitarian Aid',2),('Refugee Support',3),
          ('Post-Conflict Reconstruction',4),('Social Cohesion',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'domain_expertise' AND taxonomy_categories.name = 'Fragility, Conflict & Violence';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Technical Writing',1),('Policy Briefs',2),('Ghostwriting',3),
          ('Copywriting',4),('Academic Editing',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Writing & Editorial';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Infographics',1),('Brand Identity',2),('Publication Layout',3),
          ('Motion Graphics',4),('Photography',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Graphic Design & Creative';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('GIS Mapping',1),('Data Science',2),('Statistical Analysis',3),
          ('Python/R',4),('Financial Modeling',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Technical & Data';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Project Management',1),('Monitoring & Evaluation',2),('Change Management',3),
          ('Stakeholder Facilitation',4)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Strategic & Operations';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Translation',1),('Interpretation',2),('Localization',3),
          ('Transcreation',4),('Subtitling',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Language & Translation';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Curriculum Design',1),('Workshop Facilitation',2),('E-Learning Development',3),
          ('Training of Trainers',4),('Mentoring',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Training & Capacity Building';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Qualitative Research',1),('Survey Design',2),('Impact Evaluation',3),
          ('Market Research',4),('Policy Analysis',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Research & Analysis';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Web Development',1),('Database Management',2),('Cybersecurity',3),
          ('Cloud Architecture',4),('Mobile App Development',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Digital & IT Services';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Media Relations',1),('Social Media',2),('Advocacy Campaigns',3),
          ('Speechwriting',4),('Public Outreach',5)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'technical_skills' AND taxonomy_categories.name = 'Communications & Advocacy';

INSERT INTO taxonomy_items (category_id, name, sort_order)
SELECT id, v.name, v.sort_order FROM taxonomy_categories,
  (VALUES ('Remote',1),('On-site',2),('Hybrid',3)) AS v(name, sort_order)
WHERE taxonomy_categories.type = 'work_arrangement' AND taxonomy_categories.name = 'Work Arrangement';

-- ============ VIDEO Q&A STANDARD QUESTIONS (Premium; see PRD 7.5) ============
-- The general "Tell us about yourself" intro is NOT stored here (it's kind='intro'
-- with a fixed UI label). These are the 5 Premium standard-question prompts.
INSERT INTO interview_questions (question_text, sort_order, active) VALUES
  ('Walk us through a project you''re most proud of — what was your specific role, and what changed because of your work?', 1, true),
  ('Tell us about a time you had to deliver in an unfamiliar country or institutional context. How did you get up to speed?', 2, true),
  ('How do you communicate difficult findings or setbacks to a client or funder?', 3, true),
  ('Describe how you''ve navigated working across cultures, languages, or with local partners.', 4, true),
  ('What''s a methodology or approach you specialize in — and when is it *not* the right tool?', 5, true);

-- NOTE on Location/Language: these are free-text fields on `profiles`
-- (see profiles.location and profiles.languages). Populate filter dropdown
-- options dynamically, e.g.:
--   SELECT DISTINCT location FROM profiles WHERE approval_status='approved' ORDER BY 1;
--   SELECT DISTINCT unnest(languages) FROM profiles WHERE approval_status='approved' ORDER BY 1;
