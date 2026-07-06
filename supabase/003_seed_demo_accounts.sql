-- ============================================================================
-- MavenScout seed data: demo identities + a worked example opening (run LAST)
-- ============================================================================
-- Auth is mocked (PRD 7.9): the dev role switcher impersonates these rows by
-- their fixed UUIDs (hardcoded in src/lib/session.ts). The two colleague
-- reviewers exist so attributed notes/scores, team averages, and the
-- reviewer-grant flow (PRD 7.4) are demoable out of the box.
-- Demo consultant = the seeded Premium profile 'amara-diallo'
-- (388093d4-21e1-413a-a718-4296a10a44fc) — no extra row needed here.
-- ============================================================================

-- Demo hiring manager (the role switcher's "hiring manager" identity)
-- + two colleagues who act as granted reviewers.
INSERT INTO hiring_managers (id, user_id, name, organization) VALUES
  ('aaaaaaaa-0000-4000-a000-000000000001', NULL, 'Demo Hiring Manager', 'Horizon Development Fund'),
  ('aaaaaaaa-0000-4000-a000-000000000002', NULL, 'Alex Kim',            'Horizon Development Fund'),
  ('aaaaaaaa-0000-4000-a000-000000000003', NULL, 'Miriam Santos',       'Horizon Development Fund');

-- The always-present default quick-save opening (PRD 7.4).
INSERT INTO openings (id, hiring_manager_id, name, description, deadline, is_default) VALUES
  ('bbbbbbbb-0000-4000-a000-000000000001', 'aaaaaaaa-0000-4000-a000-000000000001',
   'Saved', NULL, NULL, true);

-- A worked example opening with candidates in different states.
INSERT INTO openings (id, hiring_manager_id, name, description, deadline, is_default) VALUES
  ('bbbbbbbb-0000-4000-a000-000000000002', 'aaaaaaaa-0000-4000-a000-000000000001',
   'Senior M&E Consultant — Sahel Resilience Program',
   'Mid-term evaluation lead for a multi-country resilience program (Burkina Faso, Niger, Mali). Mixed-methods background and Francophone field experience required.',
   '2026-09-30', false);

-- Both colleagues granted the "participate" permission on the example opening.
INSERT INTO opening_reviewers (opening_id, reviewer_id) VALUES
  ('bbbbbbbb-0000-4000-a000-000000000002', 'aaaaaaaa-0000-4000-a000-000000000002'),
  ('bbbbbbbb-0000-4000-a000-000000000002', 'aaaaaaaa-0000-4000-a000-000000000003');

-- Candidates saved into the example opening, across list/outreach states:
--   Amara Diallo  — short list (top_pick), contacted
--   Dr. Priya Nair — short list (top_pick), interview completed + post-interview capture
--   James Okafor  — long list (favorite), interview scheduled
--   Sofia Reyes   — long list (favorite), no outreach yet
INSERT INTO opening_entries (id, opening_id, profile_id, list_tag, outreach_tag, post_interview_note, post_interview_score) VALUES
  ('cccccccc-0000-4000-a000-000000000001', 'bbbbbbbb-0000-4000-a000-000000000002',
   '388093d4-21e1-413a-a718-4296a10a44fc', 'top_pick', 'contacted', NULL, NULL),
  ('cccccccc-0000-4000-a000-000000000002', 'bbbbbbbb-0000-4000-a000-000000000002',
   'ef9da174-4196-4a7d-950f-fb237c3e11ce', 'top_pick', 'interview_completed',
   'Strong systems-level thinker; wants clarity on field-travel expectations before committing. Health-systems depth is broader than our M&E need but the evaluation design instincts are excellent.', 4),
  ('cccccccc-0000-4000-a000-000000000003', 'bbbbbbbb-0000-4000-a000-000000000002',
   '09b0edb2-bee9-4e9c-91ce-77e2d8e6f7cc', 'favorite', 'interview_scheduled', NULL, NULL),
  ('cccccccc-0000-4000-a000-000000000004', 'bbbbbbbb-0000-4000-a000-000000000002',
   '2132cd88-8240-49d9-aa2c-20370a44581a', 'favorite', NULL, NULL, NULL);

-- Attributed notes + 0–5 scores from the owner and both reviewers
-- (drives the team-average and team-ranking display).
INSERT INTO candidate_notes_scores (opening_entry_id, author_id, note, score) VALUES
  -- Amara Diallo
  ('cccccccc-0000-4000-a000-000000000001', 'aaaaaaaa-0000-4000-a000-000000000001',
   'Exactly the Francophone M&E profile we scoped. FCDO governance portfolio maps well to the results-framework redesign.', 5),
  ('cccccccc-0000-4000-a000-000000000001', 'aaaaaaaa-0000-4000-a000-000000000002',
   'GBV evaluation work in DRC is directly relevant to the protection component.', 4),
  ('cccccccc-0000-4000-a000-000000000001', 'aaaaaaaa-0000-4000-a000-000000000003',
   'Availability window fits our Q3 start. Want to hear the intro video before final call.', 4),
  -- Dr. Priya Nair
  ('cccccccc-0000-4000-a000-000000000002', 'aaaaaaaa-0000-4000-a000-000000000001',
   'Heavyweight CV, but health-financing focus may be broader than this role needs.', 3),
  ('cccccccc-0000-4000-a000-000000000002', 'aaaaaaaa-0000-4000-a000-000000000002',
   'Interviewed well — see post-interview note. Would anchor the quant side strongly.', 4),
  -- James Okafor
  ('cccccccc-0000-4000-a000-000000000003', 'aaaaaaaa-0000-4000-a000-000000000001',
   'Promising, earlier-career. Could pair as second evaluator under a senior lead.', 3);

-- Read-only share link for the example opening (PRD 7.4 view path).
INSERT INTO opening_shares (opening_id, share_token) VALUES
  ('bbbbbbbb-0000-4000-a000-000000000002', 'demo-sahel-resilience-2026');
