-- MavenScout seed data: profiles + portfolio_items
-- Generated from the 15 profiles built in the original DevSector Talent Hub prototype.
-- Mapped onto the new schema: handle generated from name, user_id left NULL (auth is
-- mocked in this build), subscription_status/approval_status set so profiles are
-- immediately visible in the directory for demo purposes.

-- Amara Diallo (amara-diallo)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '388093d4-21e1-413a-a718-4296a10a44fc',
  NULL,
  $$Individual$$,
  $$amara-diallo$$,
  $$Amara Diallo$$,
  $$M&E Specialist | Gender & Social Inclusion | USAID & FCDO Programs$$,
  $$Nairobi, Kenya$$,
  $$mid_career$$,
  NULL,
  $$Senegalese and French citizen; right to work across the EU and ECOWAS. No sponsorship needed for most of West Africa or Europe; US assignments would require a visa. Can be contracted as an individual or via my French micro-entreprise.$$,
  ARRAY[$$Remote$$, $$Hybrid$$]::text[],
  $${"status": "available_now", "from": null, "until": "2026-05-01"}$$::jsonb,
  $${"status": "available_from", "from": "2026-08-01", "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=amara-diallo$$,
  $$https://picsum.photos/seed/amara-diallo/800/200$$,
  $$Amara Diallo brings nine years of hands-on experience in monitoring, evaluation, and learning across East and West Africa. She has led the design of results frameworks, performance monitoring plans, and impact evaluations for major donors including USAID, FCDO, and UN Women. Her work consistently integrates gender and social inclusion lenses, ensuring that data collection tools capture disaggregated evidence and that program learning reaches marginalized populations. Amara is fluent in Swahili and French, which has enabled her to work effectively with government counterparts and community-based organizations across Francophone and Anglophone contexts. She holds an MSc in Development Economics from the University of London and is a certified MEAL practitioner.$$,
  $$[{"name": "Gender Mainstreaming", "tier": "primary", "level": "item"}, {"name": "Gender-Based Violence", "tier": "primary", "level": "item"}, {"name": "Gender Budgeting", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Monitoring & Evaluation", "tier": "primary", "level": "item"}, {"name": "Qualitative Research", "tier": "primary", "level": "item"}, {"name": "Survey Design", "tier": "secondary", "level": "item"}, {"name": "Statistical Analysis", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$French$$, $$Swahili$$]::text[],
  $$[{"organization": "Palladium Group", "role": "Senior M&E Advisor", "start_year": 2021, "end_year": 2024, "logo_url": null, "description": "Led MEAL functions for a $45M FCDO governance program operating across four East African countries."}, {"organization": "UN Women", "role": "M&E Consultant", "start_year": 2018, "end_year": 2021, "logo_url": null, "description": "Designed data systems and conducted mid-term evaluations for gender equality programs in Kenya, Uganda, and Rwanda."}, {"organization": "Innovations for Poverty Action", "role": "Research Associate", "start_year": 2016, "end_year": 2018, "logo_url": null, "description": "Supported RCT design and field data collection for agricultural and financial inclusion studies in Ghana."}]$$::jsonb,
  $$[{"institution": "London School of Economics", "degree_or_course": "MSc Social Policy & Development", "start_year": 2013, "end_year": 2014, "logo_url": null}, {"institution": "University of Ghana", "degree_or_course": "BA Sociology", "start_year": 2009, "end_year": 2013, "logo_url": null}]$$::jsonb,
  $$[{"organization": "African Evaluation Association", "role": "Volunteer Mentor", "start_year": 2019, "end_year": null, "description": "Mentor early-career evaluators across East Africa through a peer-support program."}]$$::jsonb,
  true,
  'verified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('388093d4-21e1-413a-a718-4296a10a44fc', $$M&E Framework for USAID Youth Employment Program, Ghana$$, $$Lead M&E Specialist$$, $$Designed a comprehensive performance monitoring plan with 42 indicators aligned to USAID CDCS priorities. Built data collection tools using KoBoToolbox and produced a gender-disaggregated baseline across 6 districts in Greater Accra and Ashanti regions.$$, $$Framework adopted as the program's system of record; 42 indicators tracked quarterly across 6 districts. Gender-disaggregated baseline shifted targeting toward 3 previously-underserved districts, and the design was later reused as a template for two follow-on USAID activities in the region.$$, $$https://picsum.photos/seed/amara-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/amara-portfolio-1-img1/900/600", "caption": "Baseline enumeration in Ashanti region"}, {"url": "https://picsum.photos/seed/amara-portfolio-1-img2/900/600", "caption": "Indicator framework workshop with program staff"}]$$::jsonb, $$[{"label": "Program page (USAID)", "url": "https://www.usaid.gov/ghana"}, {"label": "Baseline report summary", "url": "https://example.org/ghana-yep-baseline"}]$$::jsonb, 1),
  ('388093d4-21e1-413a-a718-4296a10a44fc', $$Gender-Sensitive Impact Evaluation, FCDO Skills Programme, Rwanda$$, $$Evaluation Team Leader$$, $$Led a mixed-methods impact evaluation assessing the effect of a FCDO-funded TVET program on women's economic empowerment. Oversaw a survey of 1,200 households and qualitative case studies across Kigali and Southern Province.$$, $$Evaluation found a 22-point increase in women's post-training employment; findings informed FCDO's decision to extend the programme for a second phase and to ring-fence childcare stipends for female trainees.$$, $$https://picsum.photos/seed/amara-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/amara-portfolio-2-img1/900/600", "caption": "Household survey enumeration, Southern Province"}, {"url": "https://picsum.photos/seed/amara-portfolio-2-img2/900/600", "caption": "Qualitative case-study interview in Kigali"}]$$::jsonb, $$[{"label": "Evaluation brief", "url": "https://example.org/rwanda-skills-eval"}]$$::jsonb, 2),
  ('388093d4-21e1-413a-a718-4296a10a44fc', $$GBV Prevention Program Review, UN Women, DRC$$, $$Senior Evaluator$$, $$Conducted a real-time program review of a multi-site GBV prevention initiative in Eastern DRC, applying feminist evaluation principles and trauma-informed data collection approaches.$$, $$Real-time review reshaped the program's referral pathways mid-cycle, cutting average survivor referral time and expanding trauma-informed intake to all 9 sites.$$, $$https://picsum.photos/seed/amara-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/amara-portfolio-3-img1/900/600", "caption": "Community consultation, Eastern DRC"}]$$::jsonb, $$[]$$::jsonb, 3);

-- Dr. Priya Nair (dr-priya-nair)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  'ef9da174-4196-4a7d-950f-fb237c3e11ce',
  NULL,
  $$Individual$$,
  $$dr-priya-nair$$,
  $$Dr. Priya Nair$$,
  $$Global Health Strategist | Health Systems Strengthening | WHO & World Bank$$,
  $$Geneva, Switzerland$$,
  $$senior$$,
  NULL,
  $$Indian passport holder, based in Nepal on a work permit. Would need sponsorship for on-site work in the US/UK/EU. Available for direct individual contracts or through my UK-registered limited company.$$,
  ARRAY[$$Remote$$, $$On-site$$]::text[],
  $${"status": "unavailable", "from": null, "until": null}$$::jsonb,
  $${"status": "unavailable", "from": null, "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=priya-nair$$,
  $$https://picsum.photos/seed/priya-nair/800/200$$,
  $$Dr. Priya Nair is a physician-turned-policy-expert with over two decades of experience at the interface of global health, development finance, and government reform. She has held senior advisory roles at WHO headquarters in Geneva and at the World Bank, where she led technical assistance missions supporting Universal Health Coverage (UHC) policy development in South and Southeast Asia. Her expertise spans health financing, primary health care system design, pandemic preparedness planning, and health labour market analysis. Dr. Nair has published extensively in The Lancet and BMJ Global Health, and has served on expert panels for the G7 Health Track and the Global Fund. She holds an MD from AIIMS New Delhi and a DrPH from Johns Hopkins Bloomberg School of Public Health.$$,
  $$[{"name": "Health Systems", "tier": "primary", "level": "item"}, {"name": "Social Protection", "tier": "primary", "level": "item"}, {"name": "Nutrition", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Policy Analysis", "tier": "primary", "level": "item"}, {"name": "Policy Briefs", "tier": "primary", "level": "item"}, {"name": "Technical Writing", "tier": "secondary", "level": "item"}, {"name": "Stakeholder Facilitation", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$Hindi$$, $$French$$]::text[],
  $$[{"organization": "World Health Organization", "role": "Senior Technical Advisor, Health Systems", "start_year": 2016, "end_year": 2023, "logo_url": null, "description": "Led WHO technical assistance programs on health financing and UHC in 12 countries across SEARO and AFRO regions."}, {"organization": "World Bank Group", "role": "Senior Health Specialist", "start_year": 2010, "end_year": 2016, "logo_url": null, "description": "Task team leader for health system investment projects in India, Bangladesh, and Nepal."}, {"organization": "All India Institute of Medical Sciences", "role": "Research Fellow", "start_year": 2004, "end_year": 2010, "logo_url": null, "description": "Conducted clinical and epidemiological research in infectious disease and health policy."}]$$::jsonb,
  $$[{"institution": "Johns Hopkins Bloomberg School of Public Health", "degree_or_course": "PhD Health Systems", "start_year": 2010, "end_year": 2014, "logo_url": null}, {"institution": "All India Institute of Medical Sciences", "degree_or_course": "MBBS", "start_year": 2003, "end_year": 2008, "logo_url": null}]$$::jsonb,
  $$[{"organization": "The Lancet Commission on Global Health", "role": "Contributing Advisor", "start_year": 2018, "end_year": 2020, "description": "Advised on health-systems financing chapters."}]$$::jsonb,
  true,
  'verified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('ef9da174-4196-4a7d-950f-fb237c3e11ce', $$UHC Financing Roadmap, Ministry of Health, Nepal$$, $$Lead Technical Advisor$$, $$Developed a 10-year UHC financing roadmap for the Government of Nepal, modelling three fiscal scenarios and aligning with the 15th National Development Plan. Facilitated stakeholder consultations with 18 provincial health departments.$$, $$Roadmap was endorsed by the Ministry of Health and anchored a costed 5-year UHC financing plan; two of its financing options were incorporated into the subsequent national health budget.$$, $$https://picsum.photos/seed/priya-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/priya-portfolio-1-img1/900/600", "caption": "Costing workshop with Ministry of Health officials"}, {"url": "https://picsum.photos/seed/priya-portfolio-1-img2/900/600", "caption": "Field visit to a district health facility, Nepal"}]$$::jsonb, $$[{"label": "WHO UHC resources", "url": "https://www.who.int/health-topics/universal-health-coverage"}, {"label": "Roadmap overview", "url": "https://example.org/nepal-uhc-roadmap"}]$$::jsonb, 1),
  ('ef9da174-4196-4a7d-950f-fb237c3e11ce', $$Primary Health Care Investment Case, World Bank, Bangladesh$$, $$Health Economist Advisor$$, $$Led the analytical work underpinning a $300M World Bank investment in Bangladesh's primary health care network, including a health facility assessment across 64 districts and costing of the Essential Services Package.$$, $$Investment case supported a US$200M+ World Bank financing decision for primary health care; the economic model became the Ministry's reference tool for facility-level resource allocation.$$, $$https://picsum.photos/seed/priya-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/priya-portfolio-2-img1/900/600", "caption": "Primary health care facility assessment"}, {"url": "https://picsum.photos/seed/priya-portfolio-2-img2/900/600", "caption": "Data review session with district health teams"}]$$::jsonb, $$[{"label": "World Bank Bangladesh health", "url": "https://www.worldbank.org/en/country/bangladesh"}]$$::jsonb, 2),
  ('ef9da174-4196-4a7d-950f-fb237c3e11ce', $$Pandemic Preparedness Capacity Assessment, WHO SEARO, Five Countries$$, $$Team Leader$$, $$Designed and executed the Joint External Evaluation preparatory assessment for five South-East Asian countries, producing actionable National Action Plans for Health Security aligned with IHR 2005.$$, $$Cross-country assessment produced a comparative capacity scorecard used by WHO SEARO to prioritize technical support; three of the five countries adopted the recommended surveillance upgrades.$$, $$https://picsum.photos/seed/priya-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/priya-portfolio-3-img1/900/600", "caption": "Regional preparedness review workshop"}]$$::jsonb, $$[]$$::jsonb, 3);
INSERT INTO video_responses (profile_id, kind, video_url, duration_seconds) VALUES
  ('ef9da174-4196-4a7d-950f-fb237c3e11ce', 'intro', $$https://www.youtube.com/embed/dQw4w9WgXcQ$$, 0);

-- James Okafor (james-okafor)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '09b0edb2-bee9-4e9c-91ce-77e2d8e6f7cc',
  NULL,
  $$Individual$$,
  $$james-okafor$$,
  $$James Okafor$$,
  $$GIS Analyst & Climate Data Specialist | Remote Sensing | SERVIR & UNDP$$,
  $$Lagos, Nigeria$$,
  $$early_career$$,
  NULL,
  NULL,
  ARRAY[$$Remote$$, $$Hybrid$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_now", "from": null, "until": "2027-01-01"}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=james-okafor$$,
  $$https://picsum.photos/seed/james-okafor/800/200$$,
  $$James Okafor is an emerging specialist in geospatial analysis and climate data, with a focus on applying satellite remote sensing and open-source GIS tools to environmental and development challenges in sub-Saharan Africa. Over four years, he has mapped coastal erosion, deforestation fronts, and urban heat islands for programs funded by UNDP and NASA's SERVIR initiative. He is proficient in QGIS, ArcGIS, Google Earth Engine, and Python-based spatial analysis, and has built web-based mapping dashboards for non-technical government audiences. James is passionate about open data and participatory mapping approaches that put spatial intelligence directly in the hands of local communities. He holds a BSc in Geomatics from the University of Lagos.$$,
  $$[{"name": "Climate Adaptation", "tier": "primary", "level": "item"}, {"name": "Biodiversity", "tier": "primary", "level": "item"}, {"name": "Water Management", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "GIS Mapping", "tier": "primary", "level": "item"}, {"name": "Data Science", "tier": "primary", "level": "item"}, {"name": "Python/R", "tier": "secondary", "level": "item"}, {"name": "Statistical Analysis", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$Yoruba$$, $$Hausa$$]::text[],
  $$[{"organization": "SERVIR West Africa / RCMRD", "role": "Geospatial Analyst", "start_year": 2023, "end_year": null, "logo_url": null, "description": "Develops satellite-based monitoring products for climate and land use applications across 12 West African countries."}, {"organization": "UNDP Nigeria", "role": "GIS Consultant", "start_year": 2021, "end_year": 2023, "logo_url": null, "description": "Supported geospatial analysis and mapping for environment and energy programs."}]$$::jsonb,
  $$[{"institution": "University College London", "degree_or_course": "MSc Geographic Information Science", "start_year": 2015, "end_year": 2016, "logo_url": null}, {"institution": "University of Lagos", "degree_or_course": "BSc Geography", "start_year": 2010, "end_year": 2014, "logo_url": null}]$$::jsonb,
  $$[]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('09b0edb2-bee9-4e9c-91ce-77e2d8e6f7cc', $$Coastal Erosion Vulnerability Atlas, Niger Delta Region$$, $$GIS Analyst$$, $$Produced a 1:25,000 vulnerability atlas of the Niger Delta coastline using Sentinel-2 imagery and tidal modelling, identifying 47 high-risk communities for climate adaptation investment.$$, $$Atlas mapped erosion risk across 120km of coastline; used by state planning authorities to reprioritize shoreline protection investment and to flag 4 high-risk settlements for managed relocation planning.$$, $$https://picsum.photos/seed/james-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/james-portfolio-1-img1/900/600", "caption": "Shoreline change detection, 2000\u20132023"}, {"url": "https://picsum.photos/seed/james-portfolio-1-img2/900/600", "caption": "Field ground-truthing of erosion hotspots"}]$$::jsonb, $$[{"label": "Interactive atlas (demo)", "url": "https://example.org/niger-delta-atlas"}]$$::jsonb, 1),
  ('09b0edb2-bee9-4e9c-91ce-77e2d8e6f7cc', $$Deforestation Monitoring Dashboard, SERVIR West Africa$$, $$Geospatial Developer$$, $$Built a real-time deforestation alert dashboard using Google Earth Engine and Landsat time-series data, enabling six partner governments to track forest cover change at monthly intervals.$$, $$Near-real-time dashboard adopted by two national forestry agencies; automated alerts cut the lag between canopy-loss detection and field response from weeks to days.$$, $$https://picsum.photos/seed/james-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/james-portfolio-2-img1/900/600", "caption": "Forest-loss alert dashboard interface"}, {"url": "https://picsum.photos/seed/james-portfolio-2-img2/900/600", "caption": "Training forestry staff on alert triage"}]$$::jsonb, $$[{"label": "SERVIR Global", "url": "https://servirglobal.net/"}, {"label": "Dashboard walkthrough", "url": "https://example.org/servir-deforestation"}]$$::jsonb, 2),
  ('09b0edb2-bee9-4e9c-91ce-77e2d8e6f7cc', $$Urban Heat Island Mapping, UNDP Cities Program, Kano$$, $$Remote Sensing Analyst$$, $$Mapped land surface temperature differentials across Kano city using MODIS and Landsat thermal data to inform urban greening and climate-resilient design recommendations.$$, $$Heat-island mapping identified priority wards for green-infrastructure investment; findings fed into Kano's urban resilience plan and a pilot tree-planting corridor.$$, $$https://picsum.photos/seed/james-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/james-portfolio-3-img1/900/600", "caption": "Land-surface temperature map, Kano metropolitan area"}]$$::jsonb, $$[]$$::jsonb, 3);

-- Sofia Reyes (sofia-reyes)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '2132cd88-8240-49d9-aa2c-20370a44581a',
  NULL,
  $$Individual$$,
  $$sofia-reyes$$,
  $$Sofia Reyes$$,
  $$Peacebuilding & Conflict Analyst | Colombia & Latin America | USAID & UN$$,
  $$Bogotá, Colombia$$,
  $$mid_career$$,
  NULL,
  $$Colombian and Spanish dual national; authorized across the EU and Latin America without sponsorship. Remote-first. Can invoice via my Colombian sole-proprietorship (persona natural) or a Spanish autónomo registration.$$,
  ARRAY[$$Hybrid$$, $$On-site$$]::text[],
  $${"status": "available_from", "from": "2026-06-01", "until": "2026-07-01"}$$::jsonb,
  $${"status": "unavailable", "from": null, "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=sofia-reyes$$,
  $$https://picsum.photos/seed/sofia-reyes/800/200$$,
  $$Sofia Reyes has dedicated her career to building lasting peace in Latin American communities affected by protracted conflict. With eleven years of field experience, she has designed and managed peacebuilding programs for USAID, the UN Peacebuilding Fund, and the Inter-American Development Bank across Colombia, El Salvador, and Guatemala. Her work integrates conflict sensitivity analysis, community reconciliation processes, and transitional justice mechanisms. Sofia is a recognized expert on Colombia's peace process and has advised multiple municipal governments on local peace plans under the 2016 Havana Accord. She holds an MA in Conflict Resolution from American University and speaks Spanish and English natively, with working knowledge of Portuguese.$$,
  $$[{"name": "Peacebuilding", "tier": "primary", "level": "item"}, {"name": "Post-Conflict Reconstruction", "tier": "primary", "level": "item"}, {"name": "Social Cohesion", "tier": "secondary", "level": "item"}, {"name": "Humanitarian Aid", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Qualitative Research", "tier": "primary", "level": "item"}, {"name": "Stakeholder Facilitation", "tier": "primary", "level": "item"}, {"name": "Policy Analysis", "tier": "secondary", "level": "item"}, {"name": "Project Management", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$Spanish$$, $$English$$, $$Portuguese$$]::text[],
  $$[{"organization": "USAID Colombia Mission", "role": "Senior Peacebuilding Specialist", "start_year": 2019, "end_year": null, "logo_url": null, "description": "Provides technical direction for a $60M peace and governance portfolio covering 23 conflict-affected municipalities."}, {"organization": "Search for Common Ground", "role": "Program Manager, Colombia", "start_year": 2015, "end_year": 2019, "logo_url": null, "description": "Managed community dialogue and media-for-peacebuilding programs in Cauca and Nari\u00f1o departments."}, {"organization": "UN Peacebuilding Fund", "role": "Program Officer", "start_year": 2013, "end_year": 2015, "logo_url": null, "description": "Managed grant portfolios for peacebuilding initiatives in Latin America and West Africa."}]$$::jsonb,
  $$[{"institution": "Universidad de los Andes", "degree_or_course": "MA Peace & Conflict Studies", "start_year": 2012, "end_year": 2014, "logo_url": null}, {"institution": "Pontificia Universidad Javeriana", "degree_or_course": "BA Political Science", "start_year": 2007, "end_year": 2011, "logo_url": null}]$$::jsonb,
  $$[{"organization": "Colombia Truth Commission", "role": "Pro-bono Technical Advisor", "start_year": 2019, "end_year": 2021, "description": "Volunteered methodological support for community testimony analysis."}]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('2132cd88-8240-49d9-aa2c-20370a44581a', $$Municipal Peace Plan Design, Tumaco & Buenaventura, Colombia$$, $$Peacebuilding Advisor$$, $$Facilitated a participatory process engaging 340 community representatives to co-design municipal peace plans aligned with Colombia's territorial peace framework, covering land restitution, victim reparations, and community security.$$, $$Participatory peace plans adopted by both municipal governments; process convened over 40 community organizations and established standing citizen-security roundtables that continued past the engagement.$$, $$https://picsum.photos/seed/sofia-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/sofia-portfolio-1-img1/900/600", "caption": "Community peace-planning workshop, Tumaco"}, {"url": "https://picsum.photos/seed/sofia-portfolio-1-img2/900/600", "caption": "Municipal validation session, Buenaventura"}]$$::jsonb, $$[{"label": "Project overview", "url": "https://example.org/colombia-municipal-peace"}]$$::jsonb, 1),
  ('2132cd88-8240-49d9-aa2c-20370a44581a', $$Conflict Sensitivity Assessment, USAID Economic Recovery Program, El Salvador$$, $$Conflict Analyst$$, $$Conducted a do-no-harm conflict sensitivity analysis for a $28M USAID workforce development program operating in high-violence municipalities, producing a conflict mitigation plan and training staff on conflict-sensitive implementation.$$, $$Assessment reshaped program siting to avoid inadvertently reinforcing gang-controlled territories; do-no-harm guidance was integrated into all subsequent grant-making.$$, $$https://picsum.photos/seed/sofia-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/sofia-portfolio-2-img1/900/600", "caption": "Key-informant interview, San Salvador"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('2132cd88-8240-49d9-aa2c-20370a44581a', $$Ex-Combatant Reintegration Evaluation, UNODC, Colombia$$, $$Lead Evaluator$$, $$Led the midterm evaluation of a FARC ex-combatant reintegration program in six Zonas Veredales, assessing psychosocial, economic, and community acceptance dimensions using mixed methods.$$, $$Evaluation documented a 3-year reintegration trajectory and surfaced gaps in rural economic opportunity; recommendations informed UNODC's redesign of livelihood support.$$, $$https://picsum.photos/seed/sofia-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/sofia-portfolio-3-img1/900/600", "caption": "Fieldwork with reintegration cooperatives"}]$$::jsonb, $$[{"label": "Evaluation summary", "url": "https://example.org/colombia-reintegration-eval"}]$$::jsonb, 3);

-- Lena Hoffmann (lena-hoffmann)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '0b3dca45-f309-4196-b83d-8840e915a177',
  NULL,
  $$Individual$$,
  $$lena-hoffmann$$,
  $$Lena Hoffmann$$,
  $$Digital Governance Expert | Open Data & Civic Tech | EU & GIZ Programs$$,
  $$Berlin, Germany$$,
  $$senior$$,
  NULL,
  NULL,
  ARRAY[$$Remote$$, $$Hybrid$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=lena-hoffmann$$,
  $$https://picsum.photos/seed/lena-hoffmann/800/200$$,
  $$Lena Hoffmann is a seasoned digital governance expert who combines deep technical understanding with a policy-first approach to help governments design and implement digital transformation strategies. Over 18 years, she has led GIZ-funded e-government projects, EU-funded open data initiatives, and World Bank digital infrastructure assessments across 20+ countries. Her signature projects include national open data portals for Ukraine and Georgia, and a digital identity framework for the Government of Rwanda. Lena is a strong practitioner of human-centred design and co-creation methods, ensuring digital tools are accessible to low-literacy and marginalized users. She holds an MBA from ESMT Berlin and a computer science background from TU Berlin.$$,
  $$[{"name": "Digital Governance", "tier": "primary", "level": "item"}, {"name": "Citizen Engagement", "tier": "primary", "level": "item"}, {"name": "Anti-Corruption", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Web Development", "tier": "primary", "level": "item"}, {"name": "Policy Analysis", "tier": "primary", "level": "item"}, {"name": "Stakeholder Facilitation", "tier": "secondary", "level": "item"}, {"name": "Project Management", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$German$$, $$English$$, $$French$$, $$Russian$$]::text[],
  $$[{"organization": "GIZ (Deutsche Gesellschaft f\u00fcr Internationale Zusammenarbeit)", "role": "Senior Digital Governance Advisor", "start_year": 2014, "end_year": null, "logo_url": null, "description": "Technical lead on digital government transformation programs in Eastern Europe, the South Caucasus, and East Africa."}, {"organization": "European Commission, DG CONNECT", "role": "Policy Consultant", "start_year": 2010, "end_year": 2014, "logo_url": null, "description": "Contributed to the development of the EU Open Data Directive and Digital Single Market strategy."}, {"organization": "ThoughtWorks", "role": "Technology Consultant", "start_year": 2006, "end_year": 2010, "logo_url": null, "description": "Delivered agile software projects for public sector clients in Germany and the UK."}]$$::jsonb,
  $$[{"institution": "Hertie School", "degree_or_course": "Master of Public Policy", "start_year": 2011, "end_year": 2013, "logo_url": null}, {"institution": "Technical University of Munich", "degree_or_course": "BSc Informatics", "start_year": 2007, "end_year": 2011, "logo_url": null}]$$::jsonb,
  $$[]$$::jsonb,
  true,
  'verified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('0b3dca45-f309-4196-b83d-8840e915a177', $$National Open Data Portal, Government of Ukraine$$, $$Technical Lead & Project Director$$, $$Led the design, build, and launch of data.gov.ua — Ukraine's national open data portal — managing a multidisciplinary team of developers, UX designers, and policy advisors to release 3,000+ government datasets under open licence.$$, $$Portal launched with 1,000+ datasets across 20 ministries; became a reference implementation cited in regional open-government reviews and sustained an active civic-tech developer community.$$, $$https://picsum.photos/seed/lena-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/lena-portfolio-1-img1/900/600", "caption": "Portal data-catalog interface"}, {"url": "https://picsum.photos/seed/lena-portfolio-1-img2/900/600", "caption": "Open-data hackathon with civic developers"}]$$::jsonb, $$[{"label": "Open data portal (example)", "url": "https://example.org/ukraine-open-data"}, {"label": "Case study", "url": "https://example.org/ukraine-odp-casestudy"}]$$::jsonb, 1),
  ('0b3dca45-f309-4196-b83d-8840e915a177', $$Digital Identity Framework, Government of Rwanda$$, $$Policy & Standards Advisor$$, $$Advised the Rwanda Utilities Regulatory Authority on the legal and technical standards for a privacy-preserving national digital identity system, drawing on GDPR principles and NIST digital identity guidelines.$$, $$Framework set the interoperability and privacy standards later adopted for national digital-ID rollout; privacy-by-design provisions were written into the enabling regulation.$$, $$https://picsum.photos/seed/lena-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/lena-portfolio-2-img1/900/600", "caption": "Standards workshop with government stakeholders"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('0b3dca45-f309-4196-b83d-8840e915a177', $$Anti-Corruption Digital Disclosure System, GIZ Georgia$$, $$Systems Architect$$, $$Designed an asset declaration and conflict-of-interest disclosure platform for Georgian public officials, integrating with the Civil Service Bureau's HR systems and enabling public search of declarations.$$, $$Asset-disclosure system brought 10,000+ officials into structured online filing; automated conflict-of-interest flags gave the anti-corruption bureau a triage queue it previously lacked.$$, $$https://picsum.photos/seed/lena-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/lena-portfolio-3-img1/900/600", "caption": "Disclosure system architecture diagram"}]$$::jsonb, $$[{"label": "System overview", "url": "https://example.org/georgia-disclosure"}]$$::jsonb, 3);
INSERT INTO video_responses (profile_id, kind, video_url, duration_seconds) VALUES
  ('0b3dca45-f309-4196-b83d-8840e915a177', 'intro', $$https://www.youtube.com/embed/ScMzIvxBSi4$$, 0);

-- Tariq Hassan (tariq-hassan)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  'b48d9270-658b-41e4-b211-0387a4a9cff1',
  NULL,
  $$Individual$$,
  $$tariq-hassan$$,
  $$Tariq Hassan$$,
  $$Urban Transport & Infrastructure Specialist | MENA Region | World Bank & AfDB$$,
  $$Beirut, Lebanon$$,
  $$mid_career$$,
  NULL,
  NULL,
  ARRAY[$$Hybrid$$, $$On-site$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_from", "from": "2026-09-01", "until": "2026-12-01"}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=tariq-hassan$$,
  $$https://picsum.photos/seed/tariq-hassan/800/200$$,
  $$Tariq Hassan is an infrastructure specialist with deep expertise in urban mobility, transport economics, and public-private partnership structuring. Over twelve years, he has advised the World Bank, African Development Bank, and IsDB on transport sector projects spanning mass transit feasibility studies, road safety investment programs, and freight logistics optimization. His MENA-specific expertise includes work on Lebanon's national transport strategy and Jordan's Amman Bus Rapid Transit prefeasibility study. Tariq is also a practitioner of climate-resilient infrastructure design, integrating flood risk and urban heat considerations into transport investment decisions. He holds an MSc in Transport Planning from University College London and is a chartered member of the Chartered Institution of Highways and Transportation.$$,
  $$[{"name": "Urban Transport", "tier": "primary", "level": "item"}, {"name": "Public-Private Partnerships", "tier": "primary", "level": "item"}, {"name": "Road Safety", "tier": "secondary", "level": "item"}, {"name": "Energy Efficiency", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Financial Modeling", "tier": "primary", "level": "item"}, {"name": "Policy Analysis", "tier": "primary", "level": "item"}, {"name": "Project Management", "tier": "secondary", "level": "item"}, {"name": "Statistical Analysis", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$Arabic$$, $$English$$, $$French$$]::text[],
  $$[{"organization": "World Bank Group", "role": "Transport Specialist (Consultant)", "start_year": 2020, "end_year": null, "logo_url": null, "description": "Providing transport sector analysis and project preparation support for operations in MENA and East Africa."}, {"organization": "AECOM", "role": "Senior Transport Planner, MENA", "start_year": 2016, "end_year": 2020, "logo_url": null, "description": "Led transport planning and infrastructure advisory assignments across Jordan, Lebanon, Egypt, and Saudi Arabia."}, {"organization": "Atkins Global", "role": "Transport Economist", "start_year": 2012, "end_year": 2016, "logo_url": null, "description": "Economic analysis and business case development for major transport infrastructure projects in the UK and Gulf region."}]$$::jsonb,
  $$[{"institution": "American University of Beirut", "degree_or_course": "MSc Urban Planning & Policy", "start_year": 2009, "end_year": 2011, "logo_url": null}, {"institution": "American University of Beirut", "degree_or_course": "BEng Civil Engineering", "start_year": 2004, "end_year": 2008, "logo_url": null}]$$::jsonb,
  $$[]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('b48d9270-658b-41e4-b211-0387a4a9cff1', $$Amman Bus Rapid Transit Pre-Feasibility Study, Jordan$$, $$Lead Transport Economist$$, $$Led the economic and financial analysis for a proposed BRT corridor in Amman, including ridership modelling, cost-benefit analysis, and carbon emissions assessment, informing a $180M investment decision by the Islamic Development Bank.$$, $$Pre-feasibility established the economic case for two priority BRT corridors; the study's demand model and phasing plan were carried into the subsequent detailed design procurement.$$, $$https://picsum.photos/seed/tariq-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/tariq-portfolio-1-img1/900/600", "caption": "Corridor traffic survey, Amman"}, {"url": "https://picsum.photos/seed/tariq-portfolio-1-img2/900/600", "caption": "Stakeholder review of proposed BRT alignment"}]$$::jsonb, $$[{"label": "Project brief", "url": "https://example.org/amman-brt"}]$$::jsonb, 1),
  ('b48d9270-658b-41e4-b211-0387a4a9cff1', $$Road Safety Investment Program, AfDB, Morocco & Tunisia$$, $$Infrastructure Specialist$$, $$Designed a $45M African Development Bank road safety program across Morocco and Tunisia, including black-spot identification using crash data analytics, engineering countermeasure design, and institutional reform support for road agencies.$$, $$Program identified high-fatality corridors and a costed safety-upgrade package; AfDB approved financing for the first tranche of black-spot interventions.$$, $$https://picsum.photos/seed/tariq-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/tariq-portfolio-2-img1/900/600", "caption": "Black-spot road-safety audit"}]$$::jsonb, $$[{"label": "AfDB transport", "url": "https://www.afdb.org/en/topics-and-sectors/sectors/transport"}]$$::jsonb, 2),
  ('b48d9270-658b-41e4-b211-0387a4a9cff1', $$National Transport Strategy, Republic of Lebanon$$, $$Transport Policy Advisor$$, $$Contributed to Lebanon's 2022 National Transport Strategy, developing the urban mobility and freight logistics components and facilitating multi-stakeholder workshops with the Ministry of Public Works and Transport.$$, $$Strategy provided the first integrated multimodal transport vision in over a decade; adopted as the reference framework for donor coordination on transport investment.$$, $$https://picsum.photos/seed/tariq-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/tariq-portfolio-3-img1/900/600", "caption": "Multimodal planning workshop, Beirut"}]$$::jsonb, $$[]$$::jsonb, 3);

-- Mei-Ling Chen (mei-ling-chen)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  'e1ff6a4f-a52d-46a9-b498-52d6f3659bdc',
  NULL,
  $$Individual$$,
  $$mei-ling-chen$$,
  $$Mei-Ling Chen$$,
  $$Climate Finance Specialist | Green Bonds & Carbon Markets | ADB & GCF$$,
  $$Bangkok, Thailand$$,
  $$mid_career$$,
  NULL,
  $$Singaporean citizen; authorized in Singapore and (via long-term pass) Thailand. Sponsorship required elsewhere. Contract via my Singapore Pte Ltd or as an individual consultant.$$,
  ARRAY[$$Remote$$, $$Hybrid$$]::text[],
  $${"status": "available_from", "from": "2026-07-01", "until": null}$$::jsonb,
  $${"status": "available_from", "from": "2026-07-01", "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=mei-ling-chen$$,
  $$https://picsum.photos/seed/mei-ling-chen/800/200$$,
  $$Mei-Ling Chen works at the nexus of finance, climate policy, and development, helping governments and financial institutions in Southeast Asia unlock climate finance and design bankable low-carbon investments. Over a decade at the Asian Development Bank and as an independent consultant, she has structured green bond frameworks for sovereign issuers, designed carbon credit methodologies for renewable energy projects, and supported four countries in accessing Green Climate Fund resources. Her recent work focuses on transition finance — helping energy-intensive industries develop credible decarbonization pathways that can attract international capital. She holds an MSc in Environmental Finance from Columbia University's School of International and Public Affairs and is a CFA charterholder.$$,
  $$[{"name": "Renewable Energy", "tier": "primary", "level": "item"}, {"name": "Climate Mitigation", "tier": "primary", "level": "item"}, {"name": "Climate Adaptation", "tier": "secondary", "level": "item"}, {"name": "Circular Economy", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Financial Modeling", "tier": "primary", "level": "item"}, {"name": "Policy Analysis", "tier": "primary", "level": "item"}, {"name": "Technical Writing", "tier": "secondary", "level": "item"}, {"name": "Stakeholder Facilitation", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$Mandarin$$, $$Thai$$]::text[],
  $$[{"organization": "Asian Development Bank", "role": "Climate Finance Officer", "start_year": 2018, "end_year": 2023, "logo_url": null, "description": "Structured climate co-financing and green bond transactions for sovereign clients across Southeast and South Asia."}, {"organization": "IFC (International Finance Corporation)", "role": "Climate Business Analyst", "start_year": 2015, "end_year": 2018, "logo_url": null, "description": "Supported green finance product development and climate risk integration across IFC's Asia-Pacific investment portfolio."}]$$::jsonb,
  $$[{"institution": "National University of Singapore", "degree_or_course": "MSc Environmental Management", "start_year": 2011, "end_year": 2012, "logo_url": null}, {"institution": "Chulalongkorn University", "degree_or_course": "BA Economics", "start_year": 2006, "end_year": 2010, "logo_url": null}]$$::jsonb,
  $$[]$$::jsonb,
  true,
  'verified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('e1ff6a4f-a52d-46a9-b498-52d6f3659bdc', $$Sovereign Green Bond Framework, Royal Government of Thailand$$, $$Lead Climate Finance Advisor$$, $$Developed Thailand's inaugural sovereign green bond framework — the first in ASEAN to include a social co-benefits framework — enabling the Ministry of Finance to issue $1.5B in green bonds aligned with the ASEAN Green Bond Standards.$$, $$Framework underpinned a benchmark sovereign green-bond issuance; received a Second Party Opinion aligning it with ICMA Green Bond Principles and set the template for subsequent issuances.$$, $$https://picsum.photos/seed/mei-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/mei-portfolio-1-img1/900/600", "caption": "Green-bond framework launch event"}, {"url": "https://picsum.photos/seed/mei-portfolio-1-img2/900/600", "caption": "Eligible-project taxonomy workshop"}]$$::jsonb, $$[{"label": "ICMA Green Bond Principles", "url": "https://www.icmagroup.org/sustainable-finance/the-principles-guidelines-and-handbooks/green-bond-principles-gbp/"}, {"label": "Framework summary", "url": "https://example.org/thailand-green-bond"}]$$::jsonb, 1),
  ('e1ff6a4f-a52d-46a9-b498-52d6f3659bdc', $$GCF Readiness Program, Government of Cambodia$$, $$GCF Access Specialist$$, $$Supported Cambodia's National Designated Authority to develop its GCF country programming strategy and accreditation roadmap, resulting in two projects approved for GCF pipeline consideration.$$, $$Readiness support secured Cambodia's accreditation pathway to the Green Climate Fund and produced a pipeline of three concept notes, one of which advanced to full funding proposal.$$, $$https://picsum.photos/seed/mei-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/mei-portfolio-2-img1/900/600", "caption": "GCF readiness planning session, Phnom Penh"}]$$::jsonb, $$[{"label": "Green Climate Fund", "url": "https://www.greenclimate.fund/"}]$$::jsonb, 2),
  ('e1ff6a4f-a52d-46a9-b498-52d6f3659bdc', $$Carbon Credit Methodology for Off-Grid Solar, Mekong Region$$, $$Carbon Markets Specialist$$, $$Designed a Verra-verified carbon credit methodology for off-grid solar home systems across Laos, Myanmar, and Cambodia, establishing the monitoring, reporting, and verification framework for a 500,000-tonne CO2e credit stream.$$, $$Methodology enabled off-grid solar providers to access voluntary carbon revenue; validated approach was applied across an initial portfolio of 15,000 household systems.$$, $$https://picsum.photos/seed/mei-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/mei-portfolio-3-img1/900/600", "caption": "Off-grid solar installation, rural Mekong"}]$$::jsonb, $$[]$$::jsonb, 3);

-- Dr. Kwame Asante (dr-kwame-asante)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  'a241c771-1cae-47db-a6dd-a01f98742b05',
  NULL,
  $$Individual$$,
  $$dr-kwame-asante$$,
  $$Dr. Kwame Asante$$,
  $$Education Systems Expert | Curriculum Reform & Teacher Training | UNESCO & UNICEF$$,
  $$Accra, Ghana$$,
  $$senior$$,
  NULL,
  NULL,
  ARRAY[$$Remote$$, $$On-site$$]::text[],
  $${"status": "available_now", "from": null, "until": "2026-10-01"}$$::jsonb,
  $${"status": "unavailable", "from": null, "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=kwame-asante$$,
  $$https://picsum.photos/seed/kwame-asante/800/200$$,
  $$Dr. Kwame Asante is one of West Africa's most experienced education development specialists, with a career spanning classroom teaching, national curriculum reform, and large-scale donor-funded education programs. Over 25 years, he has led curriculum design processes in Ghana, Sierra Leone, and Liberia; developed national teacher professional development frameworks; and managed GPE-funded education sector programs reaching over 2 million children. His comparative advantage lies in bridging education research with practical government implementation — he understands both the pedagogical theory and the political economy of reform. Dr. Asante holds a PhD in Curriculum Studies from the University of Cape Coast and has held visiting fellowships at the University of Oxford and the University of Toronto.$$,
  $$[{"name": "Primary Education", "tier": "primary", "level": "item"}, {"name": "Tertiary Education", "tier": "primary", "level": "item"}, {"name": "Social Protection", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Curriculum Design", "tier": "primary", "level": "item"}, {"name": "Training of Trainers", "tier": "primary", "level": "item"}, {"name": "Workshop Facilitation", "tier": "secondary", "level": "item"}, {"name": "Policy Analysis", "tier": "secondary", "level": "item"}, {"name": "Technical Writing", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$Twi$$, $$French$$]::text[],
  $$[{"organization": "Ghana Education Service", "role": "Curriculum Development Consultant", "start_year": 2018, "end_year": 2023, "logo_url": null, "description": "Senior advisor on two successive national curriculum reform programs."}, {"organization": "UNESCO IIEP", "role": "Education Planning Specialist", "start_year": 2012, "end_year": 2018, "logo_url": null, "description": "Provided technical assistance on education sector planning and financing in West and Central Africa."}, {"organization": "University of Cape Coast", "role": "Associate Professor, Education", "start_year": 2004, "end_year": 2012, "logo_url": null, "description": "Taught curriculum studies and education policy; led the Department of Curriculum and Teaching."}]$$::jsonb,
  $$[{"institution": "University of Cambridge", "degree_or_course": "PhD Education", "start_year": 2006, "end_year": 2010, "logo_url": null}, {"institution": "University of Cape Coast", "degree_or_course": "MEd Curriculum Studies", "start_year": 2003, "end_year": 2005, "logo_url": null}]$$::jsonb,
  $$[{"organization": "Global Partnership for Education", "role": "Technical Review Panel Member", "start_year": 2017, "end_year": null, "description": "Volunteer reviewer for education-sector funding proposals."}]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('a241c771-1cae-47db-a6dd-a01f98742b05', $$National Basic Education Curriculum Reform, Ghana Education Service$$, $$Curriculum Development Lead$$, $$Led the Ghana Education Service's comprehensive review and redesign of the K–9 curriculum, introducing competency-based learning outcomes, STEM integration, and a revised civic education strand. Trained 1,200 master teachers as curriculum implementation coaches.$$, $$Standards-based curriculum rolled out nationally across primary grades; accompanying teacher-orientation package reached tens of thousands of teachers ahead of implementation.$$, $$https://picsum.photos/seed/kwame-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/kwame-portfolio-1-img1/900/600", "caption": "Curriculum co-design workshop with teachers"}, {"url": "https://picsum.photos/seed/kwame-portfolio-1-img2/900/600", "caption": "Pilot classroom, Greater Accra"}]$$::jsonb, $$[{"label": "Ghana Education Service", "url": "https://ges.gov.gh/"}]$$::jsonb, 1),
  ('a241c771-1cae-47db-a6dd-a01f98742b05', $$Teacher Professional Development Framework, UNICEF Sierra Leone$$, $$Education Systems Advisor$$, $$Designed Sierra Leone's National Teacher Professional Development Framework post-Ebola, establishing in-service training standards, a continuous professional learning record system, and regional training centre network.$$, $$Framework established a national in-service teacher-training model; adopted by the Teaching Service Commission as the basis for continuous professional development.$$, $$https://picsum.photos/seed/kwame-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/kwame-portfolio-2-img1/900/600", "caption": "Teacher training-of-trainers session, Freetown"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('a241c771-1cae-47db-a6dd-a01f98742b05', $$Learning Assessment System Design, GPE Program, Liberia$$, $$Assessment Specialist$$, $$Designed Liberia's national early grade reading and mathematics assessment system, including item bank development, standardization protocols, and a school-level reporting dashboard for district education officers.$$, $$Designed Liberia's first standardized early-grade learning assessment; results gave the Ministry a baseline for tracking literacy and numeracy gains over time.$$, $$https://picsum.photos/seed/kwame-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/kwame-portfolio-3-img1/900/600", "caption": "Early-grade assessment administration"}]$$::jsonb, $$[{"label": "Global Partnership for Education", "url": "https://www.globalpartnership.org/"}]$$::jsonb, 3);
INSERT INTO video_responses (profile_id, kind, video_url, duration_seconds) VALUES
  ('a241c771-1cae-47db-a6dd-a01f98742b05', 'intro', $$https://www.youtube.com/embed/LXb3EKWsInQ$$, 0);

-- Fatima Al-Rashid (fatima-al-rashid)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '9169e962-d148-4d97-92d9-e4cb37209044',
  NULL,
  $$Individual$$,
  $$fatima-al-rashid$$,
  $$Fatima Al-Rashid$$,
  $$Development Researcher | Qualitative Methods & Refugee Studies | UNHCR & IRC$$,
  $$Amman, Jordan$$,
  $$early_career$$,
  NULL,
  NULL,
  ARRAY[$$Remote$$, $$Hybrid$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=fatima-al-rashid$$,
  $$https://picsum.photos/seed/fatima-al-rashid/800/200$$,
  $$Fatima Al-Rashid is a bilingual researcher with a passion for ethical, community-centred inquiry. Over five years, she has conducted qualitative research and learning studies with Syrian, Iraqi, and South Sudanese refugee populations in Jordan, Lebanon, and Kenya, for clients including UNHCR, the International Rescue Committee, and the Rift Valley Institute. Her methodological repertoire includes in-depth interviews, focus group discussions, participatory action research, and oral history collection. She is trained in trauma-informed and Do No Harm research ethics, and has a particular interest in the intersection of forced displacement, legal identity, and access to services. Fatima holds an MSc in Refugee and Forced Migration Studies from the University of Oxford.$$,
  $$[{"name": "Refugee Support", "tier": "primary", "level": "item"}, {"name": "Humanitarian Aid", "tier": "primary", "level": "item"}, {"name": "Social Cohesion", "tier": "secondary", "level": "item"}, {"name": "Gender-Based Violence", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Qualitative Research", "tier": "primary", "level": "item"}, {"name": "Survey Design", "tier": "primary", "level": "item"}, {"name": "Policy Briefs", "tier": "secondary", "level": "item"}, {"name": "Translation", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$Arabic$$, $$English$$, $$French$$]::text[],
  $$[{"organization": "UNHCR Jordan", "role": "Research Consultant", "start_year": 2024, "end_year": null, "logo_url": null, "description": "Conducts protection monitoring and qualitative research in support of UNHCR's solutions programming."}, {"organization": "International Rescue Committee", "role": "Research & MEAL Officer", "start_year": 2021, "end_year": 2024, "logo_url": null, "description": "Designed and implemented learning studies and program evaluations across IRC Lebanon and Jordan programs."}]$$::jsonb,
  $$[{"institution": "University of Oxford", "degree_or_course": "MPhil Development Studies", "start_year": 2012, "end_year": 2014, "logo_url": null}, {"institution": "University of Jordan", "degree_or_course": "BA Sociology", "start_year": 2007, "end_year": 2011, "logo_url": null}]$$::jsonb,
  $$[]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('9169e962-d148-4d97-92d9-e4cb37209044', $$Durable Solutions Research, Syrian Refugees in Jordan, UNHCR$$, $$Lead Researcher$$, $$Led a qualitative research study with 180 Syrian refugee households in Amman and Zarqa on intentions and barriers around voluntary return, local integration, and third-country resettlement, informing UNHCR Jordan's durable solutions strategy.$$, $$Mixed-methods study of 800+ households informed UNHCR's durable-solutions strategy; findings on livelihood barriers shaped a revised work-permit advocacy agenda.$$, $$https://picsum.photos/seed/fatima-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/fatima-portfolio-1-img1/900/600", "caption": "Household interview, Zaatari-area community"}, {"url": "https://picsum.photos/seed/fatima-portfolio-1-img2/900/600", "caption": "Research team debrief, Amman"}]$$::jsonb, $$[{"label": "UNHCR Jordan", "url": "https://www.unhcr.org/jordan"}]$$::jsonb, 1),
  ('9169e962-d148-4d97-92d9-e4cb37209044', $$GBV Response Program Learning Study, IRC, Lebanon$$, $$Research Consultant$$, $$Conducted a learning study on the effectiveness of IRC's cash-plus GBV prevention model in Beirut and Bekaa Valley, using feminist participatory methods and survivor-centred analysis frameworks.$$, $$Learning study identified access barriers for adolescent survivors; recommendations were adopted into IRC's case-management protocols across its Lebanon sites.$$, $$https://picsum.photos/seed/fatima-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/fatima-portfolio-2-img1/900/600", "caption": "Safe-space facility assessment, Bekaa Valley"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('9169e962-d148-4d97-92d9-e4cb37209044', $$Legal Identity and Service Access Research, South Sudanese Refugees, Kenya$$, $$Field Research Lead$$, $$Managed field data collection and analysis for a mixed-methods study on documentation barriers faced by South Sudanese refugees in Kakuma and Nairobi, producing policy recommendations adopted by UNHCR Kenya.$$, $$Research documented civil-documentation gaps blocking service access; evidence supported a UNHCR-government dialogue on birth-registration for refugee children.$$, $$https://picsum.photos/seed/fatima-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/fatima-portfolio-3-img1/900/600", "caption": "Field research, Kalobeyei settlement"}]$$::jsonb, $$[{"label": "Research brief", "url": "https://example.org/kenya-legal-identity"}]$$::jsonb, 3);

-- Rohan Mehta (rohan-mehta)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '382822da-2b19-45d6-8c2f-6296957fcdc4',
  NULL,
  $$Individual$$,
  $$rohan-mehta$$,
  $$Rohan Mehta$$,
  $$WASH & Climate Resilience Specialist | Delta & Coastal Systems | World Bank & UNICEF$$,
  $$Dhaka, Bangladesh$$,
  $$mid_career$$,
  NULL,
  $$Bangladeshi national in Dhaka; no restrictions for remote engagements, sponsorship needed for on-site work outside South Asia. Can be engaged individually or through my registered proprietorship.$$,
  ARRAY[$$Hybrid$$, $$On-site$$]::text[],
  $${"status": "unavailable", "from": null, "until": null}$$::jsonb,
  $${"status": "available_from", "from": "2026-11-01", "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=rohan-mehta$$,
  $$https://picsum.photos/seed/rohan-mehta/800/200$$,
  $$Rohan Mehta brings an engineering background and a systems-thinking approach to water, sanitation, and climate resilience challenges in some of the world's most climate-vulnerable landscapes. Over 13 years, he has worked across Bangladesh's delta regions, coastal Odisha in India, and the Mekong Delta in Vietnam, designing climate-resilient WASH infrastructure, water resource management plans, and community-based adaptation programs for the World Bank, UNICEF, and the Asian Development Bank. His current research focuses on anticipatory action frameworks for waterborne disease outbreaks linked to cyclone events — integrating early warning systems with WASH service continuity planning. He holds an MTech in Environmental Engineering from IIT Bombay.$$,
  $$[{"name": "WASH", "tier": "primary", "level": "item"}, {"name": "Climate Adaptation", "tier": "primary", "level": "item"}, {"name": "Water Management", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Project Management", "tier": "primary", "level": "item"}, {"name": "Statistical Analysis", "tier": "primary", "level": "item"}, {"name": "GIS Mapping", "tier": "secondary", "level": "item"}, {"name": "Technical Writing", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$Bengali$$, $$Hindi$$]::text[],
  $$[{"organization": "UNICEF Bangladesh", "role": "WASH Specialist (Consultant)", "start_year": 2022, "end_year": null, "logo_url": null, "description": "Technical lead on climate-resilient WASH programming in cyclone-affected coastal districts."}, {"organization": "World Bank South Asia", "role": "Infrastructure Consultant", "start_year": 2018, "end_year": 2022, "logo_url": null, "description": "Provided WASH engineering and climate adaptation technical assistance for projects in Bangladesh, India, and Nepal."}, {"organization": "BRAC", "role": "WASH Program Officer", "start_year": 2013, "end_year": 2018, "logo_url": null, "description": "Managed community WASH programs in hard-to-reach char and haor areas of Bangladesh."}]$$::jsonb,
  $$[{"institution": "Institute of Development Studies, Sussex", "degree_or_course": "MA Climate Change & Development", "start_year": 2013, "end_year": 2014, "logo_url": null}, {"institution": "Bangladesh University of Engineering & Technology", "degree_or_course": "BSc Civil & Environmental Engineering", "start_year": 2008, "end_year": 2012, "logo_url": null}]$$::jsonb,
  $$[]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('382822da-2b19-45d6-8c2f-6296957fcdc4', $$Climate Vulnerability Assessment, Bangladesh Delta Region$$, $$Lead Technical Specialist$$, $$Conducted a comprehensive climate vulnerability and risk assessment for WASH infrastructure across 14 coastal upazilas in Bangladesh, integrating sea-level rise projections, cyclone track modelling, and groundwater salinity data to prioritize a $120M adaptation investment plan.$$, $$Assessment mapped salinity and flood exposure for 2M+ delta residents; results fed directly into the World Bank's delta-resilience investment prioritization.$$, $$https://picsum.photos/seed/rohan-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/rohan-portfolio-1-img1/900/600", "caption": "Salinity monitoring, coastal Bangladesh"}, {"url": "https://picsum.photos/seed/rohan-portfolio-1-img2/900/600", "caption": "Community vulnerability-mapping session"}]$$::jsonb, $$[{"label": "World Bank Bangladesh", "url": "https://www.worldbank.org/en/country/bangladesh"}, {"label": "Assessment summary", "url": "https://example.org/bangladesh-delta-vulnerability"}]$$::jsonb, 1),
  ('382822da-2b19-45d6-8c2f-6296957fcdc4', $$Cyclone-Resilient Water Supply Design, Odisha State, India$$, $$WASH Infrastructure Specialist$$, $$Led engineering design of elevated and flood-proofed community water supply systems in 120 coastal villages in Odisha, incorporating community water safety plans and climate stress-testing protocols.$$, $$Resilient water-supply designs deployed in cyclone-exposed coastal blocks; systems maintained safe-water access through a subsequent severe-storm season.$$, $$https://picsum.photos/seed/rohan-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/rohan-portfolio-2-img1/900/600", "caption": "Elevated water-supply infrastructure, coastal Odisha"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('382822da-2b19-45d6-8c2f-6296957fcdc4', $$Urban Sanitation Resilience Plan, Dhaka North City Corporation$$, $$Climate Resilience Advisor$$, $$Developed Dhaka North's urban sanitation climate resilience plan, identifying infrastructure at risk from riverine flooding and developing a phased adaptation investment programme with the city's WASH utility.$$, $$Plan established a flood-resilient sanitation strategy for a rapidly growing urban area; prioritized investments were incorporated into the city corporation's capital plan.$$, $$https://picsum.photos/seed/rohan-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/rohan-portfolio-3-img1/900/600", "caption": "Drainage and sanitation survey, Dhaka North"}]$$::jsonb, $$[{"label": "Plan overview", "url": "https://example.org/dhaka-sanitation-resilience"}]$$::jsonb, 3);

-- Ifeoma Obi & Associates (ifeoma-obi-and-associates)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '27a9dee9-67c0-4867-9922-8746254e504a',
  NULL,
  $$Small Firm$$,
  $$ifeoma-obi-and-associates$$,
  $$Ifeoma Obi & Associates$$,
  $$Agricultural Development Boutique | Food Systems & Rural Finance | IFAD & FAO$$,
  $$Abuja, Nigeria$$,
  NULL,
  2016,
  $$Registered in Nigeria as Ifeoma Obi & Associates Ltd (CAC-registered). Contracts directly as a firm; can mobilize associates across West Africa.$$,
  ARRAY[$$Hybrid$$, $$On-site$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_now", "from": null, "until": "2027-03-01"}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=ifeoma-obi$$,
  $$https://picsum.photos/seed/ifeoma-obi/800/200$$,
  $$Ifeoma Obi & Associates is a boutique agricultural development consultancy founded in 2016 and headquartered in Abuja, Nigeria. The firm's six-person core team combines agronomy, rural finance, value chain analysis, and gender expertise to deliver integrated food systems programs across West and Central Africa. Clients include IFAD, FAO, the African Development Bank, and the Bill & Melinda Gates Foundation. The firm has a particular strength in farmer organization strengthening, rural financial product design, and market linkage facilitation — built from years of field experience with smallholder farmers in Nigeria, Cameroon, Ghana, and Côte d'Ivoire. Ifeoma Obi, the firm's founder, holds an MSc in Agricultural Economics from Wageningen University.$$,
  $$[{"name": "Food Security", "tier": "primary", "level": "item"}, {"name": "Agribusiness", "tier": "primary", "level": "item"}, {"name": "Rural Development", "tier": "secondary", "level": "item"}, {"name": "Sustainable Farming", "tier": "secondary", "level": "item"}, {"name": "Financial Inclusion", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Qualitative Research", "tier": "primary", "level": "item"}, {"name": "Survey Design", "tier": "primary", "level": "item"}, {"name": "Monitoring & Evaluation", "tier": "secondary", "level": "item"}, {"name": "Stakeholder Facilitation", "tier": "secondary", "level": "item"}, {"name": "Financial Modeling", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$French$$, $$Igbo$$, $$Hausa$$]::text[],
  $$[]$$::jsonb,
  $$[]$$::jsonb,
  $$[]$$::jsonb,
  true,
  'verified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('27a9dee9-67c0-4867-9922-8746254e504a', $$Smallholder Rice Value Chain Development, IFAD, Nigeria$$, $$Value Chain Lead$$, $$Led the agricultural component of an IFAD-funded rural finance program in Kebbi and Ebonyi states, designing market linkage models connecting 12,000 smallholder rice farmers to agro-processors and export buyers.$$, $$Value-chain program linked 12,000+ smallholders to structured off-take arrangements; participating farmers saw measurable gains in yield and price realization over two seasons.$$, $$https://picsum.photos/seed/ifeoma-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/ifeoma-portfolio-1-img1/900/600", "caption": "Smallholder rice cooperative, Nigeria"}, {"url": "https://picsum.photos/seed/ifeoma-portfolio-1-img2/900/600", "caption": "Post-harvest aggregation center"}]$$::jsonb, $$[{"label": "IFAD", "url": "https://www.ifad.org/"}, {"label": "Program summary", "url": "https://example.org/nigeria-rice-value-chain"}]$$::jsonb, 1),
  ('27a9dee9-67c0-4867-9922-8746254e504a', $$Agri-Finance Product Design, LAPO Microfinance Bank, Nigeria$$, $$Agricultural Finance Specialist$$, $$Designed three tailored agricultural loan products for LAPO Microfinance Bank — seasonal credit, warehouse receipt financing, and input voucher schemes — with a gender-responsive repayment structure to increase women's uptake.$$, $$Designed a seasonally-structured agri-loan product; pilot achieved strong repayment performance and was approved for scale-up across additional branches.$$, $$https://picsum.photos/seed/ifeoma-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/ifeoma-portfolio-2-img1/900/600", "caption": "Farmer financial-literacy session"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('27a9dee9-67c0-4867-9922-8746254e504a', $$Food Systems Resilience Assessment, FAO, Sahel Region$$, $$Food Systems Analyst$$, $$Contributed to a FAO-led food systems resilience assessment across five Sahel countries, analysing supply chain disruptions, market integration failures, and humanitarian-development nexus gaps.$$, $$Multi-country assessment identified priority resilience investments across fragile Sahel food systems; framework informed FAO's regional resilience programming.$$, $$https://picsum.photos/seed/ifeoma-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/ifeoma-portfolio-3-img1/900/600", "caption": "Pastoralist consultation, Sahel"}]$$::jsonb, $$[{"label": "FAO", "url": "https://www.fao.org/"}]$$::jsonb, 3);

-- Pablo Vargas (pablo-vargas)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  'a8161c80-db01-47c6-ba5b-ec4f86883950',
  NULL,
  $$Individual$$,
  $$pablo-vargas$$,
  $$Pablo Vargas$$,
  $$Impact Evaluation & Data Specialist | Stata/R/Python | IDB & J-PAL Affiliated$$,
  $$Lima, Peru$$,
  $$early_career$$,
  NULL,
  NULL,
  ARRAY[$$Remote$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_from", "from": "2026-08-01", "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=pablo-vargas$$,
  $$https://picsum.photos/seed/pablo-vargas/800/200$$,
  $$Pablo Vargas is a quantitative specialist passionate about rigorous impact evidence in social policy. Affiliated with J-PAL Latin America and the Caribbean since 2022, he has supported randomized controlled trials and quasi-experimental evaluations for social protection, education, and labor market programs funded by the Inter-American Development Bank and the World Bank. Pablo is proficient in Stata, R, and Python, and has contributed to the design of survey instruments, power calculations, and administrative data linkage strategies for evaluations in Peru, Ecuador, and Bolivia. He holds an MA in Economics from Universidad del Pacífico and a graduate certificate in Impact Evaluation from the Paris School of Economics.$$,
  $$[{"name": "Social Protection", "tier": "primary", "level": "item"}, {"name": "Primary Education", "tier": "primary", "level": "item"}, {"name": "Food Security", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Statistical Analysis", "tier": "primary", "level": "item"}, {"name": "Survey Design", "tier": "primary", "level": "item"}, {"name": "Impact Evaluation", "tier": "secondary", "level": "item"}, {"name": "Python/R", "tier": "secondary", "level": "item"}, {"name": "Monitoring & Evaluation", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$Spanish$$, $$English$$, $$Portuguese$$]::text[],
  $$[{"organization": "J-PAL Latin America and the Caribbean", "role": "Research Associate", "start_year": 2022, "end_year": null, "logo_url": null, "description": "Supports RCT design, data management, and statistical analysis for social sector evaluations across LAC."}, {"organization": "Grupo de An\u00e1lisis para el Desarrollo (GRADE)", "role": "Junior Researcher", "start_year": 2020, "end_year": 2022, "logo_url": null, "description": "Conducted quantitative research on education and labor market policy in Peru."}]$$::jsonb,
  $$[{"institution": "University of California, Berkeley", "degree_or_course": "MA Development Economics", "start_year": 2011, "end_year": 2013, "logo_url": null}, {"institution": "Pontificia Universidad Cat\u00f3lica del Per\u00fa", "degree_or_course": "BSc Economics", "start_year": 2006, "end_year": 2010, "logo_url": null}]$$::jsonb,
  $$[]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('a8161c80-db01-47c6-ba5b-ec4f86883950', $$RCT Evaluation of Conditional Cash Transfer Scale-Up, Peru$$, $$Quantitative Analyst$$, $$Supported the evaluation design and data analysis for an RCT assessing the impact of the Juntos CCT program expansion on child nutrition and school enrollment in rural Andean communities, using administrative data from 420,000 beneficiaries.$$, $$Randomized evaluation credibly estimated program effects on school attendance and nutrition; results informed the government's decision to expand coverage to additional regions.$$, $$https://picsum.photos/seed/pablo-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/pablo-portfolio-1-img1/900/600", "caption": "Field survey enumeration, rural Peru"}, {"url": "https://picsum.photos/seed/pablo-portfolio-1-img2/900/600", "caption": "Data-quality review with field team"}]$$::jsonb, $$[{"label": "J-PAL", "url": "https://www.povertyactionlab.org/"}, {"label": "Evaluation summary", "url": "https://example.org/peru-cct-rct"}]$$::jsonb, 1),
  ('a8161c80-db01-47c6-ba5b-ec4f86883950', $$Labor Market Impact Evaluation, Youth Employment Program, Ecuador$$, $$Impact Evaluation Specialist$$, $$Designed a regression discontinuity evaluation of Ecuador's Jóvenes Construyendo el Futuro vocational training program, building the empirical strategy, data pipeline, and analytical code in Stata and R.$$, $$Evaluation isolated program impact on youth earnings and formal employment; cost-effectiveness findings shaped the design of the program's next phase.$$, $$https://picsum.photos/seed/pablo-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/pablo-portfolio-2-img1/900/600", "caption": "Youth participant tracer survey, Ecuador"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('a8161c80-db01-47c6-ba5b-ec4f86883950', $$Social Registry Data Quality Assessment, IDB, Bolivia$$, $$Data Systems Analyst$$, $$Conducted a data quality and coverage assessment of Bolivia's Registro Único de Beneficiarios social registry, identifying targeting errors and developing a de-duplication protocol that improved registry accuracy by 18%.$$, $$Assessment quantified targeting errors in the social registry and recommended fixes; adopted improvements tightened eligibility accuracy for social programs.$$, $$https://picsum.photos/seed/pablo-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/pablo-portfolio-3-img1/900/600", "caption": "Social-registry data audit"}]$$::jsonb, $$[{"label": "IDB", "url": "https://www.iadb.org/en"}]$$::jsonb, 3);

-- NorthStar Advisory Group (northstar-advisory-group)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  '398fe5c2-48df-428f-9ee4-e5f2c44d1643',
  NULL,
  $$Small Firm$$,
  $$northstar-advisory-group$$,
  $$NorthStar Advisory Group$$,
  $$Public Financial Management & Governance Reform | USAID & MCC Contractors$$,
  $$Washington DC, USA$$,
  NULL,
  2009,
  $$US-incorporated LLC (Delaware); registered with SAM.gov for federal contracting. Engages via prime or subcontract arrangements.$$,
  ARRAY[$$Remote$$, $$On-site$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=northstar-advisory$$,
  $$https://picsum.photos/seed/northstar-advisory/800/200$$,
  $$NorthStar Advisory Group is a specialist governance and public financial management consultancy founded in 2009 and headquartered in Washington DC. The firm's 12-person team of former senior government officials, economists, and governance specialists has delivered programs in over 30 countries, with particular depth in Sub-Saharan Africa, Central America, and Southeast Asia. NorthStar's core capabilities include PFM reform design and implementation, domestic revenue mobilization, anti-corruption institutional strengthening, and public procurement modernization. The firm holds multiple USAID IDIQ vehicles and has been a principal contractor on three Millennium Challenge Corporation compacts. NorthStar is known for its rigorous political economy analysis approach and its ability to translate reform recommendations into politically feasible implementation roadmaps.$$,
  $$[{"name": "Anti-Corruption", "tier": "primary", "level": "item"}, {"name": "Public Procurement", "tier": "primary", "level": "item"}, {"name": "Justice Reform", "tier": "secondary", "level": "item"}, {"name": "Citizen Engagement", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Policy Analysis", "tier": "primary", "level": "item"}, {"name": "Financial Modeling", "tier": "primary", "level": "item"}, {"name": "Stakeholder Facilitation", "tier": "secondary", "level": "item"}, {"name": "Technical Writing", "tier": "secondary", "level": "item"}, {"name": "Project Management", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$French$$, $$Spanish$$]::text[],
  $$[]$$::jsonb,
  $$[]$$::jsonb,
  $$[]$$::jsonb,
  true,
  'verified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('398fe5c2-48df-428f-9ee4-e5f2c44d1643', $$PFM Reform Program, MCC Compact, El Salvador$$, $$PFM Team Leader$$, $$Led the public financial management component of a $277M MCC compact in El Salvador, designing and implementing reforms to budget planning, treasury management, and procurement systems across 14 central government ministries.$$, $$Reform program strengthened budget execution and procurement transparency under an MCC compact; reforms met the compact's PFM milestones on schedule.$$, $$https://picsum.photos/seed/northstar-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/northstar-portfolio-1-img1/900/600", "caption": "Public financial management training, San Salvador"}, {"url": "https://picsum.photos/seed/northstar-portfolio-1-img2/900/600", "caption": "Treasury systems review session"}]$$::jsonb, $$[{"label": "Millennium Challenge Corporation", "url": "https://www.mcc.gov/"}, {"label": "Program overview", "url": "https://example.org/elsalvador-pfm"}]$$::jsonb, 1),
  ('398fe5c2-48df-428f-9ee4-e5f2c44d1643', $$Domestic Revenue Mobilization Support, USAID, Senegal$$, $$Tax Reform Advisor$$, $$Provided technical assistance to Senegal's Direction Générale des Impôts et Domaines on taxpayer segmentation, large taxpayer unit strengthening, and VAT gap analysis, contributing to a 2.1% GDP increase in tax revenue over 3 years.$$, $$Advisory support helped modernize tax administration processes; measured improvements in filing compliance contributed to a rise in domestic revenue.$$, $$https://picsum.photos/seed/northstar-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/northstar-portfolio-2-img1/900/600", "caption": "Tax administration modernization workshop, Dakar"}]$$::jsonb, $$[]$$::jsonb, 2),
  ('398fe5c2-48df-428f-9ee4-e5f2c44d1643', $$Anti-Corruption Institutional Assessment, USAID, Philippines$$, $$Governance Specialist$$, $$Conducted a comprehensive institutional mapping and corruption risk assessment of the Philippine procurement system, informing the design of a $15M USAID governance program.$$, $$Institutional assessment mapped accountability gaps across oversight bodies; recommendations framed USAID's subsequent governance programming.$$, $$https://picsum.photos/seed/northstar-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/northstar-portfolio-3-img1/900/600", "caption": "Oversight-institution stakeholder interviews, Manila"}]$$::jsonb, $$[{"label": "Assessment brief", "url": "https://example.org/philippines-anticorruption"}]$$::jsonb, 3);

-- EcoClimate Partners (ecoclimate-partners)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  'fb489885-706e-4e98-92ce-d0e6d9a24a9d',
  NULL,
  $$Small Firm$$,
  $$ecoclimate-partners$$,
  $$EcoClimate Partners$$,
  $$Climate & Biodiversity Advisory | Nature-Based Solutions | FCDO & EU Programs$$,
  $$London, UK$$,
  NULL,
  2014,
  $$UK-registered limited company (Companies House); VAT-registered. Contracts as a firm across UK/EU and internationally.$$,
  ARRAY[$$Remote$$, $$Hybrid$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_from", "from": "2026-06-01", "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=ecoclimate-partners$$,
  $$https://picsum.photos/seed/ecoclimate-partners/800/200$$,
  $$EcoClimate Partners is a specialized environmental advisory firm established in London in 2018, bringing together eight ecologists, climate scientists, and environmental economists. The firm's work bridges the gap between conservation science and development finance — translating biodiversity and climate data into investment cases, safeguard frameworks, and nature-based solutions programs that attract international capital. EcoClimate has deep expertise in FCDO's Business Case methodology, EU environmental impact assessment requirements, and emerging nature-based solutions standards including TNFD and the Kunming-Montreal Global Biodiversity Framework. Recent engagements span tropical forest conservation finance in West Africa, coral reef ecosystem services valuation in the Pacific, and biodiversity mainstreaming in IFI project pipelines.$$,
  $$[{"name": "Biodiversity", "tier": "primary", "level": "item"}, {"name": "Climate Adaptation", "tier": "primary", "level": "item"}, {"name": "Climate Mitigation", "tier": "secondary", "level": "item"}, {"name": "Renewable Energy", "tier": "secondary", "level": "item"}, {"name": "Water Management", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Policy Analysis", "tier": "primary", "level": "item"}, {"name": "Financial Modeling", "tier": "primary", "level": "item"}, {"name": "GIS Mapping", "tier": "secondary", "level": "item"}, {"name": "Technical Writing", "tier": "secondary", "level": "item"}, {"name": "Impact Evaluation", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$French$$, $$Portuguese$$]::text[],
  $$[]$$::jsonb,
  $$[]$$::jsonb,
  $$[]$$::jsonb,
  false,
  'unverified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('fb489885-706e-4e98-92ce-d0e6d9a24a9d', $$Nature-Based Solutions Investment Case, Congo Basin Forest, FCDO$$, $$Lead Environmental Economist$$, $$Developed the investment case for a $200M FCDO-funded nature-based solutions program in the Congo Basin, quantifying carbon sequestration, biodiversity co-benefits, and watershed services using integrated valuation modelling.$$, $$Investment case quantified the carbon and biodiversity value of priority forest landscapes; underpinned an FCDO decision to channel finance into nature-based solutions.$$, $$https://picsum.photos/seed/ecoclimate-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/ecoclimate-portfolio-1-img1/900/600", "caption": "Forest carbon field survey, Congo Basin"}, {"url": "https://picsum.photos/seed/ecoclimate-portfolio-1-img2/900/600", "caption": "Community forest-governance consultation"}]$$::jsonb, $$[{"label": "FCDO", "url": "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office"}, {"label": "Investment case summary", "url": "https://example.org/congo-basin-nbs"}]$$::jsonb, 1),
  ('fb489885-706e-4e98-92ce-d0e6d9a24a9d', $$Biodiversity Safeguard Framework, IFC Portfolio, Sub-Saharan Africa$$, $$Biodiversity Specialist$$, $$Developed an IFC Performance Standard 6-aligned biodiversity safeguard screening tool and offset methodology for a 12-country IFC infrastructure investment portfolio, training 45 investment officers on biodiversity risk assessment.$$, $$Safeguard framework operationalized IFC Performance Standard 6 across a portfolio of investments; became the reference tool for biodiversity due-diligence on new deals.$$, $$https://picsum.photos/seed/ecoclimate-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/ecoclimate-portfolio-2-img1/900/600", "caption": "Biodiversity baseline survey"}]$$::jsonb, $$[{"label": "IFC Performance Standards", "url": "https://www.ifc.org/en/insights-reports/2012/publications-policy-performancestandards"}]$$::jsonb, 2),
  ('fb489885-706e-4e98-92ce-d0e6d9a24a9d', $$Coral Reef Ecosystem Services Valuation, Pacific Region, EU$$, $$Marine Ecosystem Economist$$, $$Led the economic valuation of coral reef ecosystem services (fisheries, tourism, coastal protection) across five Pacific island states, providing evidence for a €45M EU-funded marine conservation and adaptation program.$$, $$Valuation quantified the economic contribution of reef ecosystems to coastal livelihoods and tourism; results supported the case for marine-protected-area financing.$$, $$https://picsum.photos/seed/ecoclimate-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/ecoclimate-portfolio-3-img1/900/600", "caption": "Coral reef survey, Pacific"}]$$::jsonb, $$[]$$::jsonb, 3);

-- Dr. Sunita Patel (dr-sunita-patel)
INSERT INTO profiles (
  id, user_id, consultant_type, handle, name, headline, location, career_level, year_founded, contracting_work_eligibility,
  work_types, part_time_availability, full_time_availability, availability_updated_at, photo_url, cover_image_url,
  detailed_bio, expertise, skills, accreditations, languages,
  work_history, education_history, additional_experience, is_premium, verification_status, custom_domain, subscription_status, approval_status
) VALUES (
  'ade0f4c7-c4a6-453c-a5c4-ccf933c17362',
  NULL,
  $$Individual$$,
  $$dr-sunita-patel$$,
  $$Dr. Sunita Patel$$,
  $$Social Protection & Gender Equity Specialist | Shock-Responsive Systems | ADB & UNICEF$$,
  $$Manila, Philippines$$,
  $$senior$$,
  NULL,
  NULL,
  ARRAY[$$Remote$$, $$On-site$$]::text[],
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  $${"status": "available_now", "from": null, "until": null}$$::jsonb,
  now() - interval '10 days',
  $$https://i.pravatar.cc/150?u=sunita-patel$$,
  $$https://picsum.photos/seed/sunita-patel/800/200$$,
  $$Dr. Sunita Patel is a leading expert on social protection systems in Southeast Asia, with a particular focus on making safety nets responsive to economic shocks, climate disasters, and health crises. Over twenty years, she has advised Asian Development Bank operations in the Philippines, Indonesia, Vietnam, and Cambodia, and has led UNICEF-supported assessments of social protection system coverage gaps. Her recent work centres on gender-transformative social protection — designing cash transfer programs that not only provide income support but actively address unpaid care work, gender-based discrimination, and women's economic agency. Dr. Patel was a key technical contributor to the Philippines' Pantawid Pamilyang Pilipino Program (4Ps) reform process and has advised Indonesia on its Social Protection Floor strategy. She holds a PhD in Development Economics from the Australian National University.$$,
  $$[{"name": "Social Protection", "tier": "primary", "level": "item"}, {"name": "Gender Mainstreaming", "tier": "primary", "level": "item"}, {"name": "Gender Budgeting", "tier": "secondary", "level": "item"}, {"name": "Nutrition", "tier": "secondary", "level": "item"}, {"name": "Health Systems", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[{"name": "Policy Analysis", "tier": "primary", "level": "item"}, {"name": "Impact Evaluation", "tier": "primary", "level": "item"}, {"name": "Survey Design", "tier": "secondary", "level": "item"}, {"name": "Statistical Analysis", "tier": "secondary", "level": "item"}, {"name": "Stakeholder Facilitation", "tier": "secondary", "level": "item"}]$$::jsonb,
  $$[]$$::jsonb,
  ARRAY[$$English$$, $$Filipino$$, $$Hindi$$]::text[],
  $$[{"organization": "Asian Development Bank", "role": "Social Protection Specialist (Consultant)", "start_year": 2017, "end_year": null, "logo_url": null, "description": "Provides technical advisory on social protection system design and evaluation across ADB's Southeast Asia portfolio."}, {"organization": "UNICEF East Asia & Pacific", "role": "Social Policy Specialist", "start_year": 2011, "end_year": 2017, "logo_url": null, "description": "Led social protection policy and programming support across six UNICEF country offices."}, {"organization": "Australian National University", "role": "Research Fellow, Development Economics", "start_year": 2007, "end_year": 2011, "logo_url": null, "description": "Conducted field research on poverty dynamics and social safety nets in Indonesia and the Philippines."}]$$::jsonb,
  $$[{"institution": "London School of Economics", "degree_or_course": "PhD Social Policy", "start_year": 2008, "end_year": 2012, "logo_url": null}, {"institution": "University of the Philippines", "degree_or_course": "MA Public Administration", "start_year": 2004, "end_year": 2006, "logo_url": null}]$$::jsonb,
  $$[{"organization": "UN Women Asia-Pacific", "role": "Gender Advisory Group Member", "start_year": 2020, "end_year": null, "description": "Pro-bono advisory on social-protection gender integration."}]$$::jsonb,
  true,
  'verified',
  NULL,
  'active',
  'approved'
);
INSERT INTO portfolio_items (profile_id, project_name, role, description, results, cover_image, images, links, sort_order) VALUES
  ('ade0f4c7-c4a6-453c-a5c4-ccf933c17362', $$Shock-Responsive Social Protection Assessment, Philippines$$, $$Lead Social Protection Specialist$$, $$Led a comprehensive assessment of the Philippines' 4Ps conditional cash transfer program's capacity to respond to typhoon shocks, producing a shock-responsiveness roadmap adopted by the Department of Social Welfare and Development.$$, $$Assessment produced a shock-responsiveness roadmap adopted by the Department of Social Welfare and Development; informed protocols for scaling cash transfers during typhoon response.$$, $$https://picsum.photos/seed/sunita-portfolio-1/600/400$$, $$[{"url": "https://picsum.photos/seed/sunita-portfolio-1-img1/900/600", "caption": "Post-disaster cash-transfer field visit"}, {"url": "https://picsum.photos/seed/sunita-portfolio-1-img2/900/600", "caption": "Systems workshop with DSWD officials"}]$$::jsonb, $$[{"label": "DSWD Philippines", "url": "https://www.dswd.gov.ph/"}, {"label": "Roadmap summary", "url": "https://example.org/philippines-srsp"}]$$::jsonb, 1),
  ('ade0f4c7-c4a6-453c-a5c4-ccf933c17362', $$Gender-Transformative Cash Transfer Design, UNICEF, Indonesia$$, $$Gender & Social Protection Advisor$$, $$Designed gender-transformative features for Indonesia's Program Keluarga Harapan (PKH) cash transfer, including care economy provisions, domestic violence referral linkages, and women's financial inclusion components reaching 9.2M beneficiary families.$$, $$Redesign embedded care-economy provisions and GBV referral linkages into a cash-transfer program reaching 9.2M families; gender-transformative features adopted into program guidelines.$$, $$https://picsum.photos/seed/sunita-portfolio-2/600/400$$, $$[{"url": "https://picsum.photos/seed/sunita-portfolio-2-img1/900/600", "caption": "Beneficiary consultation, Indonesia"}]$$::jsonb, $$[{"label": "UNICEF Indonesia", "url": "https://www.unicef.org/indonesia/"}]$$::jsonb, 2),
  ('ade0f4c7-c4a6-453c-a5c4-ccf933c17362', $$Social Protection Floor Costing Study, ADB, Cambodia$$, $$Social Protection Economist$$, $$Developed the costing model and fiscal space analysis for Cambodia's Social Protection Floor strategy, modelling five benefit package options against projected GDP growth, donor co-financing, and domestic revenue scenarios to 2035.$$, $$Costing study modeled five benefit-package options against fiscal-space scenarios to 2035; provided the evidence base for Cambodia's social-protection floor strategy.$$, $$https://picsum.photos/seed/sunita-portfolio-3/600/400$$, $$[{"url": "https://picsum.photos/seed/sunita-portfolio-3-img1/900/600", "caption": "Fiscal-space modeling workshop, Phnom Penh"}]$$::jsonb, $$[{"label": "ADB", "url": "https://www.adb.org/"}]$$::jsonb, 3);
