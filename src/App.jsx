import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench, Shield, User, Users, MapPin, ClipboardList,
  CheckCircle2, Clock, AlertCircle, Plus, Search, Download,
  Camera, LogOut, Database, X, BarChart3, Building2, Phone, UserPlus,
  ArrowRight, ChevronDown, ChevronUp, ChevronRight, Trash2,
  Snowflake, Moon, Sun, Languages, TrendingUp, LayoutGrid, ArrowLeft, History
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

// ============================================================================
// 1. INITIAL SEED DATA (Matches CoolFix Reference Screens, Companies & Teams)
// ============================================================================
const INITIAL_AREAS = [
  { id: 'area-1', area_name: 'Al Rai' },
  { id: 'area-2', area_name: 'Sharq' },
  { id: 'area-3', area_name: 'Salmiya' },
  { id: 'area-4', area_name: 'Shuwaikh' },
  { id: 'area-5', area_name: 'Al Zahra' },
  { id: 'area-6', area_name: 'Al Farwaniyah' },
  { id: 'area-7', area_name: 'West Mishref' },
  { id: 'area-8', area_name: 'Hawally' },
  { id: 'area-9', area_name: 'Kuwait City' }
];

const INITIAL_COMPANIES = [
  { id: 'comp-1', company_name: 'Alghanim Industries', company_logo: '', contact_number: '+965 2245 8890', email: 'facilities@alghanim.kw', address: 'Al Rai, Kuwait' },
  { id: 'comp-2', company_name: 'Boubyan Bank', company_logo: '', contact_number: '+965 2232 5000', email: 'ops@boubyan.kw', address: 'Sharq, Kuwait City' },
  { id: 'comp-3', company_name: 'Al Shaya Group', company_logo: '', contact_number: '+965 2224 2000', email: 'maint@alshaya.kw', address: 'Salmiya, Kuwait' },
  { id: 'comp-4', company_name: '360 Mall', company_logo: '', contact_number: '+965 2530 9530', email: 'ops@360mall.kw', address: 'Al Zahra, Kuwait' },
  { id: 'comp-5', company_name: 'Ooredoo Kuwait', company_logo: '', contact_number: '+965 121', email: 'facilities@ooredoo.com.kw', address: 'Sharq, Kuwait' },
  { id: 'comp-6', company_name: 'M.H. Alshaya Co.', company_logo: '', contact_number: '+965 2224 3000', email: 'hvac@alshaya.com', address: 'Hawally, Kuwait' },
  { id: 'comp-7', company_name: 'Al Hamad Tower', company_logo: '', contact_number: '+965 2240 1100', email: 'tower@alhamad.kw', address: 'Sharq, Kuwait' },
  { id: 'comp-8', company_name: 'Assima Mall', company_logo: '', contact_number: '+965 2200 9900', email: 'support@assima.kw', address: 'Sharq, Kuwait' }
];

const INITIAL_LOCATIONS = [
  { id: 'loc-1', company_id: 'comp-4', area_id: 'area-5', branch_name: '360 Mall - Al Zahra Branch', full_address: 'Al Zahra - Block 1, Street 21, Al Zahra', contact_person: 'Manager 21', contact_phone: '+965 2222 0021', is_active: true },
  { id: 'loc-2', company_id: 'comp-7', area_id: 'area-2', branch_name: 'Al Hamad Tower - Sharq Branch', full_address: 'Sharq - Block 1, Street 17, Sharq', contact_person: 'Manager 17', contact_phone: '+965 2222 0017', is_active: true },
  { id: 'loc-3', company_id: 'comp-7', area_id: 'area-9', branch_name: 'Al Hamad Tower - Kuwait City Branch', full_address: 'Kuwait City - Block 1, Street 18, Kuwait City', contact_person: 'Manager 18', contact_phone: '+965 2222 0018', is_active: true },
  { id: 'loc-4', company_id: 'comp-3', area_id: 'area-3', branch_name: 'Al Shaya Group - Salmiya Branch', full_address: 'Salmiya - Block 1, Street 1, Salmiya', contact_person: 'Manager 1', contact_phone: '+965 2222 0001', is_active: true },
  { id: 'loc-5', company_id: 'comp-3', area_id: 'area-8', branch_name: 'Al Shaya Group - Hawally Branch', full_address: 'Hawally - Block 1, Street 2, Hawally', contact_person: 'Manager 2', contact_phone: '+965 2222 0002', is_active: true },
  { id: 'loc-6', company_id: 'comp-3', area_id: 'area-6', branch_name: 'Al Shaya Group - Al Farwaniyah Branch', full_address: 'Al Farwaniyah - Block 1, Street 3, Al Farwaniyah', contact_person: 'Manager 3', contact_phone: '+965 2222 0003', is_active: true },
  { id: 'loc-7', company_id: 'comp-1', area_id: 'area-1', branch_name: 'Alghanim Industries - Al Rai Branch', full_address: 'Al Rai - Block 1, Street 7, Al Rai', contact_person: 'Manager 7', contact_phone: '+965 2222 0007', is_active: true },
  { id: 'loc-8', company_id: 'comp-1', area_id: 'area-4', branch_name: 'Alghanim Industries - Shuwaikh Branch', full_address: 'Shuwaikh - Block 1, Street 8, Shuwaikh', contact_person: 'Manager 8', contact_phone: '+965 2222 0008', is_active: true },
  { id: 'loc-9', company_id: 'comp-1', area_id: 'area-9', branch_name: 'Alghanim Industries - Kuwait City Branch', full_address: 'Kuwait City - Block 1, Street 9, Kuwait City', contact_person: 'Manager 9', contact_phone: '+965 2222 0009', is_active: true },
  { id: 'loc-10', company_id: 'comp-8', area_id: 'area-2', branch_name: 'Assima Mall - Sharq Branch', full_address: 'Sharq - Block 1, Street 20, Sharq', contact_person: 'Manager 20', contact_phone: '+965 2222 0020', is_active: true },
  { id: 'loc-11', company_id: 'comp-2', area_id: 'area-2', branch_name: 'Boubyan Bank - Sharq Branch', full_address: 'Sharq - Block 1, Street 12, Sharq', contact_person: 'Manager 12', contact_phone: '+965 2222 0012', is_active: true },
  { id: 'loc-12', company_id: 'comp-2', area_id: 'area-3', branch_name: 'Boubyan Bank - Salmiya Branch', full_address: 'Salmiya - Block 1, Street 13, Salmiya', contact_person: 'Manager 13', contact_phone: '+965 2222 0013', is_active: true },
  { id: 'loc-13', company_id: 'comp-5', area_id: 'area-7', branch_name: 'Ooredoo Kuwait - West Mishref Branch', full_address: 'West Mishref - Block 2, Street 4', contact_person: 'Manager 14', contact_phone: '+965 2222 0014', is_active: true },
  { id: 'loc-14', company_id: 'comp-6', area_id: 'area-8', branch_name: 'M.H. Alshaya Co. - Hawally Branch', full_address: 'Hawally - Tunis St, Block 4', contact_person: 'Manager 15', contact_phone: '+965 2222 0015', is_active: true }
];

const INITIAL_TEAMS = [
  { id: 'team-alpha', team_name: 'Team Alpha', team_leader_name: 'Ahmed Hassan', team_leader_phone: '+965 5551 0101', login_username: 'team_alpha', is_active: true },
  { id: 'team-bravo', team_name: 'Team Bravo', team_leader_name: 'Mohammed Ali', team_leader_phone: '+965 5551 0102', login_username: 'team_bravo', is_active: true },
  { id: 'team-charlie', team_name: 'Team Charlie', team_leader_name: 'Khalid Rahman', team_leader_phone: '+965 5551 0103', login_username: 'team_charlie', is_active: true },
  { id: 'team-delta', team_name: 'Team Delta', team_leader_name: 'Omar Farouk', team_leader_phone: '+965 5551 0104', login_username: 'team_delta', is_active: true }
];

const INITIAL_TEAM_MEMBERS = [
  { id: 'tm-1', team_id: 'team-alpha', member_name: 'Ahmed Hassan', phone_number: '+965 5551 0101', member_role: 'leader' },
  { id: 'tm-2', team_id: 'team-alpha', member_name: 'Saud Al-Otaibi', phone_number: '+965 5551 0111', member_role: 'member' },
  { id: 'tm-3', team_id: 'team-alpha', member_name: 'Fahad Al-Sabah', phone_number: '+965 5551 0112', member_role: 'member' },
  { id: 'tm-4', team_id: 'team-bravo', member_name: 'Mohammed Ali', phone_number: '+965 5551 0102', member_role: 'leader' },
  { id: 'tm-5', team_id: 'team-bravo', member_name: 'Yousef Al-Kandari', phone_number: '+965 5551 0121', member_role: 'member' },
  { id: 'tm-6', team_id: 'team-charlie', member_name: 'Khalid Rahman', phone_number: '+965 5551 0103', member_role: 'leader' },
  { id: 'tm-7', team_id: 'team-delta', member_name: 'Omar Farouk', phone_number: '+965 5551 0104', member_role: 'leader' },
  { id: 'tm-8', team_id: 'team-delta', member_name: 'Rami Mansour', phone_number: '+965 5551 0141', member_role: 'member' }
];

const INITIAL_COMPLAINTS = [
  { id: 'cmp-101', ticket_number: 'TKT-2611-0001', company_id: 'comp-1', location_id: 'loc-7', area_id: 'area-1', contact_person: 'Manager 7', contact_phone: '+965 2222 0007', priority: 'high', issue_type: 'Filter Replacement', description: 'Not working', status: 'assigned', assigned_team_id: 'team-alpha', created_at: '2026-11-25T11:04:00+03:00', assigned_at: '2026-11-25T13:15:00+03:00', started_at: null, completed_at: null, completion_notes: '' },
  { id: 'cmp-102', ticket_number: 'TKT-2610-0001', company_id: 'comp-2', location_id: 'loc-11', area_id: 'area-2', contact_person: 'Manager 12', contact_phone: '+965 2222 0012', priority: 'high', issue_type: 'AC Leakage', description: 'AC Leakage - Boubyan Bank - Sharq Branch', status: 'in_progress', assigned_team_id: 'team-alpha', created_at: '2026-10-01T11:30:00+03:00', assigned_at: '2026-10-01T11:45:00+03:00', started_at: '2026-10-01T13:10:00+03:00', completed_at: null, completion_notes: '' },
  { id: 'cmp-103', ticket_number: 'TKT-2609-0038', company_id: 'comp-3', location_id: 'loc-6', area_id: 'area-6', contact_person: 'Manager 3', contact_phone: '+965 2222 0003', priority: 'normal', issue_type: 'Compressor Failure', description: 'Compressor Failure - Al Shaya Group - Al Farwaniyah Branch', status: 'completed', assigned_team_id: 'team-alpha', created_at: '2026-09-30T14:20:00+03:00', assigned_at: '2026-09-30T14:50:00+03:00', started_at: '2026-09-30T15:30:00+03:00', completed_at: '2026-09-30T17:15:00+03:00', completion_notes: 'Compressor replaced and tested.' },
  { id: 'cmp-104', ticket_number: 'TKT-2609-0037', company_id: 'comp-4', location_id: 'loc-1', area_id: 'area-5', contact_person: 'Manager 21', contact_phone: '+965 2222 0021', priority: 'high', issue_type: 'Complete Service', description: 'Complete Service - 360 Mall - Al Zahra Branch', status: 'assigned', assigned_team_id: 'team-alpha', created_at: '2026-09-27T10:05:00+03:00', assigned_at: '2026-09-27T10:30:00+03:00', started_at: null, completed_at: null, completion_notes: '' },
  { id: 'cmp-105', ticket_number: 'TKT-2609-0036', company_id: 'comp-4', location_id: 'loc-1', area_id: 'area-5', contact_person: 'Manager 21', contact_phone: '+965 2222 0021', priority: 'high', issue_type: 'AC Leakage', description: 'AC Leakage - 360 Mall - Al Zahra Branch', status: 'assigned', assigned_team_id: 'team-delta', created_at: '2026-09-27T08:15:00+03:00', assigned_at: '2026-09-27T08:40:00+03:00', started_at: null, completed_at: null, completion_notes: '' },
  { id: 'cmp-106', ticket_number: 'TKT-2609-0030', company_id: 'comp-5', location_id: 'loc-13', area_id: 'area-7', contact_person: 'Manager 14', contact_phone: '+965 2222 0014', priority: 'normal', issue_type: 'Compressor Failure', description: 'Compressor Failure - Ooredoo Kuwait - West Mishref', status: 'in_progress', assigned_team_id: 'team-delta', created_at: '2026-09-26T12:10:00+03:00', assigned_at: '2026-09-26T12:30:00+03:00', started_at: '2026-09-26T14:00:00+03:00', completed_at: null, completion_notes: '' },
  { id: 'cmp-107', ticket_number: 'TKT-2609-0019', company_id: 'comp-2', location_id: 'loc-12', area_id: 'area-3', contact_person: 'Manager 13', contact_phone: '+965 2222 0013', priority: 'normal', issue_type: 'Filter Replacement', description: 'Filter Replacement - Boubyan Bank - Salmiya', status: 'completed', assigned_team_id: 'team-delta', created_at: '2026-09-24T09:00:00+03:00', assigned_at: '2026-09-24T09:30:00+03:00', started_at: '2026-09-24T10:15:00+03:00', completed_at: '2026-09-24T11:45:00+03:00', completion_notes: 'All filters cleaned and replaced.' },
  { id: 'cmp-108', ticket_number: 'TKT-2609-0002', company_id: 'comp-1', location_id: 'loc-8', area_id: 'area-4', contact_person: 'Manager 8', contact_phone: '+965 2222 0008', priority: 'high', issue_type: 'Gas Refill', description: 'Gas Refill - Alghanim Industries - Shuwaikh', status: 'assigned', assigned_team_id: 'team-alpha', created_at: '2026-09-22T15:00:00+03:00', assigned_at: '2026-09-22T15:20:00+03:00', started_at: null, completed_at: null, completion_notes: '' },
  { id: 'cmp-109', ticket_number: 'TKT-2609-0024', company_id: 'comp-4', location_id: 'loc-1', area_id: 'area-5', contact_person: 'Manager 21', contact_phone: '+965 2222 0021', priority: 'normal', issue_type: 'AC Leakage', description: 'AC Leakage - 360 Mall - Al Zahra', status: 'assigned', assigned_team_id: 'team-delta', created_at: '2026-09-22T11:20:00+03:00', assigned_at: '2026-09-22T11:40:00+03:00', started_at: null, completed_at: null, completion_notes: '' },
  { id: 'cmp-110', ticket_number: 'TKT-2609-0001', company_id: 'comp-6', location_id: 'loc-14', area_id: 'area-8', contact_person: 'Manager 15', contact_phone: '+965 2222 0015', priority: 'urgent', issue_type: 'AC Not Cooling', description: 'AC Not Cooling - M.H. Alshaya Co. - Hawally', status: 'assigned', assigned_team_id: 'team-delta', created_at: '2026-09-21T16:10:00+03:00', assigned_at: '2026-09-21T16:25:00+03:00', started_at: null, completed_at: null, completion_notes: '' },
  { id: 'cmp-111', ticket_number: 'TKT-2609-0014', company_id: 'comp-6', location_id: 'loc-4', area_id: 'area-3', contact_person: 'Manager 1', contact_phone: '+965 2222 0001', priority: 'high', issue_type: 'AC Not Cooling', description: 'AC Not Cooling - M.H. Alshaya Co. - Salmiya', status: 'in_progress', assigned_team_id: 'team-delta', created_at: '2026-09-20T13:05:00+03:00', assigned_at: '2026-09-20T13:30:00+03:00', started_at: '2026-09-20T14:15:00+03:00', completed_at: null, completion_notes: '' },
  { id: 'cmp-112', ticket_number: 'TKT-2609-0033', company_id: 'comp-3', location_id: 'loc-4', area_id: 'area-3', contact_person: 'Manager 1', contact_phone: '+965 2222 0001', priority: 'normal', issue_type: 'AC Leakage', description: 'AC Leakage - Al Shaya Group - Salmiya', status: 'assigned', assigned_team_id: 'team-bravo', created_at: '2026-09-20T10:40:00+03:00', assigned_at: '2026-09-20T11:00:00+03:00', started_at: null, completed_at: null, completion_notes: '' },
  { id: 'cmp-113', ticket_number: 'TKT-2609-0035', company_id: 'comp-5', location_id: 'loc-11', area_id: 'area-2', contact_person: 'Manager 12', contact_phone: '+965 2222 0012', priority: 'normal', issue_type: 'Thermostat Issue', description: 'Thermostat Issue - Ooredoo Kuwait - Sharq', status: 'pending', assigned_team_id: null, created_at: '2026-09-20T09:15:00+03:00', assigned_at: null, started_at: null, completed_at: null, completion_notes: '' }
];

const INITIAL_ASSIGNMENTS = [
  { id: 'asg-1', complaint_id: 'cmp-101', team_id: 'team-alpha', assigned_by: 'Admin', assignment_notes: 'Replace HEPA & pre-filters.', assigned_at: '2026-11-25T13:15:00+03:00', unassigned_at: null, is_current: true },
  { id: 'asg-2', complaint_id: 'cmp-102', team_id: 'team-alpha', assigned_by: 'Admin', assignment_notes: 'Inspect condensate drain pan.', assigned_at: '2026-10-01T11:45:00+03:00', unassigned_at: null, is_current: true }
];

const INITIAL_STATUS_HISTORY = [
  { id: 'sh-1', complaint_id: 'cmp-101', previous_status: null, new_status: 'pending', notes: 'Submitted via Customer Portal', created_at: '2026-11-25T11:04:00+03:00' },
  { id: 'sh-2', complaint_id: 'cmp-101', previous_status: 'pending', new_status: 'assigned', notes: 'Assigned to Team Alpha', created_at: '2026-11-25T13:15:00+03:00' }
];

const INITIAL_SETTINGS = {
  id: 'set-1',
  company_name: 'CoolFix',
  company_logo: '',
  system_name: 'AC Maintenance Management',
  company_phone: '+965 2200 4500',
  company_email: 'dispatch@coolfix-kw.com',
  company_address: 'Shuwaikh Industrial Area, Kuwait',
  default_language: 'en',
  timezone: 'Asia/Kuwait'
};

// ============================================================================
// 2. COMPLETE POSTGRESQL SCHEMA (Tables, Triggers, Indexes, RLS, RPCs, Storage)
// ============================================================================
const SUPABASE_SCHEMA_SQL = `-- CoolFix AC Maintenance Management System (Supabase PostgreSQL Schema)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.areas (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  area_name text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name text NOT NULL,
  company_logo text DEFAULT '',
  contact_number text DEFAULT '',
  email text DEFAULT '',
  address text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.teams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_name text NOT NULL UNIQUE,
  team_leader_name text NOT NULL,
  team_leader_phone text NOT NULL,
  login_username text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  username text UNIQUE,
  email text,
  phone text,
  role text NOT NULL DEFAULT 'team' CHECK (role IN ('admin', 'team')),
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  language text NOT NULL DEFAULT 'en',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.locations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  area_id uuid REFERENCES public.areas(id) ON DELETE SET NULL,
  branch_name text NOT NULL,
  full_address text NOT NULL,
  contact_person text DEFAULT '',
  contact_phone text DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  member_name text NOT NULL,
  phone_number text NOT NULL,
  member_role text NOT NULL DEFAULT 'member' CHECK (member_role IN ('leader', 'member')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE SEQUENCE IF NOT EXISTS public.complaint_ticket_seq START 1;

CREATE TABLE IF NOT EXISTS public.complaints (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number text NOT NULL UNIQUE,
  company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  location_id uuid REFERENCES public.locations(id) ON DELETE SET NULL,
  area_id uuid REFERENCES public.areas(id) ON DELETE SET NULL,
  contact_person text NOT NULL,
  contact_phone text NOT NULL,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'high', 'urgent')),
  issue_type text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed')),
  assigned_team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  assigned_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  completion_notes text DEFAULT ''
);

CREATE TABLE IF NOT EXISTS public.complaint_assignments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id uuid NOT NULL REFERENCES public.complaints(id) ON DELETE CASCADE,
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  assigned_by uuid,
  assignment_notes text DEFAULT '',
  assigned_at timestamptz NOT NULL DEFAULT now(),
  unassigned_at timestamptz,
  is_current boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.complaint_status_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id uuid NOT NULL REFERENCES public.complaints(id) ON DELETE CASCADE,
  previous_status text,
  new_status text NOT NULL,
  changed_by uuid,
  notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.complaint_notes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id uuid NOT NULL REFERENCES public.complaints(id) ON DELETE CASCADE,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  user_id uuid,
  note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.complaint_photos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id uuid NOT NULL REFERENCES public.complaints(id) ON DELETE CASCADE,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  photo_type text NOT NULL CHECK (photo_type IN ('before', 'after')),
  storage_path text NOT NULL,
  uploaded_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.system_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name text NOT NULL DEFAULT 'CoolFix',
  company_logo text DEFAULT '',
  system_name text NOT NULL DEFAULT 'AC Maintenance Management',
  company_phone text DEFAULT '',
  company_email text DEFAULT '',
  company_address text DEFAULT '',
  default_language text NOT NULL DEFAULT 'en',
  timezone text NOT NULL DEFAULT 'Asia/Kuwait',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.generate_complaint_ticket()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  yr text := to_char(now() AT TIME ZONE 'Asia/Kuwait', 'YYYY');
  seq_val bigint;
BEGIN
  IF NEW.ticket_number IS NULL OR NEW.ticket_number = '' THEN
    seq_val := nextval('public.complaint_ticket_seq');
    NEW.ticket_number := 'AC-' || yr || '-' || lpad(seq_val::text, 4, '0');
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_generate_complaint_ticket ON public.complaints;
CREATE TRIGGER trg_generate_complaint_ticket
BEFORE INSERT ON public.complaints
FOR EACH ROW EXECUTE FUNCTION public.generate_complaint_ticket();

CREATE OR REPLACE FUNCTION public.log_complaint_status_change()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.complaint_status_history (complaint_id, previous_status, new_status, notes)
    VALUES (NEW.id, NULL, NEW.status, 'Complaint submitted');
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.complaint_status_history (complaint_id, previous_status, new_status, notes)
    VALUES (NEW.id, OLD.status, NEW.status, COALESCE(NEW.completion_notes, 'Status updated'));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_log_complaint_status_change ON public.complaints;
CREATE TRIGGER trg_log_complaint_status_change
AFTER INSERT OR UPDATE OF status ON public.complaints
FOR EACH ROW EXECUTE FUNCTION public.log_complaint_status_change();

CREATE INDEX IF NOT EXISTS idx_complaints_ticket_number ON public.complaints (ticket_number);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints (status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON public.complaints (created_at);
CREATE INDEX IF NOT EXISTS idx_complaints_assigned_team_id ON public.complaints (assigned_team_id);
CREATE INDEX IF NOT EXISTS idx_complaints_location_id ON public.complaints (location_id);
CREATE INDEX IF NOT EXISTS idx_complaints_area_id ON public.complaints (area_id);

CREATE OR REPLACE FUNCTION public.get_public_locations()
RETURNS TABLE (
  location_id uuid,
  branch_name text,
  full_address text,
  area_id uuid,
  area_name text,
  company_name text
) LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT l.id, l.branch_name, l.full_address, l.area_id, a.area_name, c.company_name
  FROM public.locations l
  LEFT JOIN public.areas a ON a.id = l.area_id
  LEFT JOIN public.companies c ON c.id = l.company_id
  WHERE l.is_active = true
  ORDER BY l.branch_name;
$$;

CREATE OR REPLACE FUNCTION public.submit_public_complaint(
  p_location_id uuid,
  p_contact_person text,
  p_contact_phone text,
  p_issue_type text,
  p_priority text,
  p_description text
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_loc record;
  v_row public.complaints;
BEGIN
  SELECT id, company_id, area_id INTO v_loc FROM public.locations WHERE id = p_location_id AND is_active = true;
  IF NOT FOUND THEN RAISE EXCEPTION 'Invalid or inactive branch location'; END IF;

  INSERT INTO public.complaints (
    company_id, location_id, area_id, contact_person, contact_phone,
    priority, issue_type, description, status
  ) VALUES (
    v_loc.company_id, v_loc.id, v_loc.area_id, trim(p_contact_person), trim(p_contact_phone),
    COALESCE(NULLIF(p_priority, ''), 'normal'), trim(p_issue_type), trim(p_description), 'pending'
  ) RETURNING * INTO v_row;

  RETURN jsonb_build_object('id', v_row.id, 'ticket_number', v_row.ticket_number, 'status', v_row.status);
END;
$$;

CREATE OR REPLACE FUNCTION public.track_public_ticket(p_ticket_number text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_res jsonb;
BEGIN
  SELECT jsonb_build_object(
    'ticket_number', c.ticket_number,
    'status', c.status,
    'priority', c.priority,
    'issue_type', c.issue_type,
    'description', c.description,
    'branch_name', l.branch_name,
    'assigned_team', COALESCE(tm.team_name, 'Awaiting Assignment'),
    'created_at', c.created_at,
    'assigned_at', c.assigned_at,
    'started_at', c.started_at,
    'completed_at', c.completed_at,
    'completion_notes', c.completion_notes
  ) INTO v_res
  FROM public.complaints c
  LEFT JOIN public.locations l ON l.id = c.location_id
  LEFT JOIN public.teams tm ON tm.id = c.assigned_team_id
  WHERE upper(c.ticket_number) = upper(trim(p_ticket_number));
  RETURN v_res;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_locations() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_public_complaint(uuid, text, text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.track_public_ticket(text) TO anon, authenticated;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin' AND is_active = true);
$$;

CREATE OR REPLACE FUNCTION public.my_team_id()
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT team_id FROM public.profiles WHERE id = auth.uid() AND is_active = true LIMIT 1;
$$;

CREATE POLICY profiles_select ON public.profiles FOR SELECT USING (id = auth.uid() OR public.is_admin());
CREATE POLICY profiles_admin_all ON public.profiles FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY companies_rw ON public.companies FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (public.is_admin());
CREATE POLICY areas_rw ON public.areas FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (public.is_admin());
CREATE POLICY locations_rw ON public.locations FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (public.is_admin());
CREATE POLICY teams_rw ON public.teams FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (public.is_admin());
CREATE POLICY team_members_rw ON public.team_members FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (public.is_admin());
CREATE POLICY settings_rw ON public.system_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (public.is_admin());

CREATE POLICY complaints_select ON public.complaints FOR SELECT USING (public.is_admin() OR assigned_team_id = public.my_team_id());
CREATE POLICY complaints_insert ON public.complaints FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY complaints_update ON public.complaints FOR UPDATE USING (public.is_admin() OR assigned_team_id = public.my_team_id());

CREATE POLICY assignments_rw ON public.complaint_assignments FOR ALL USING (public.is_admin() OR team_id = public.my_team_id()) WITH CHECK (public.is_admin());
CREATE POLICY history_select ON public.complaint_status_history FOR SELECT USING (
  public.is_admin() OR EXISTS (SELECT 1 FROM public.complaints c WHERE c.id = complaint_id AND c.assigned_team_id = public.my_team_id())
);
CREATE POLICY notes_rw ON public.complaint_notes FOR ALL USING (public.is_admin() OR team_id = public.my_team_id()) WITH CHECK (public.is_admin() OR team_id = public.my_team_id());
CREATE POLICY photos_rw ON public.complaint_photos FOR ALL USING (public.is_admin() OR team_id = public.my_team_id()) WITH CHECK (public.is_admin() OR team_id = public.my_team_id());

INSERT INTO storage.buckets (id, name, public) VALUES
  ('company-assets', 'company-assets', false),
  ('complaint-before-photos', 'complaint-before-photos', false),
  ('complaint-after-photos', 'complaint-after-photos', false)
ON CONFLICT (id) DO NOTHING;

ALTER PUBLICATION supabase_realtime ADD TABLE public.complaints, public.teams, public.locations, public.complaint_status_history;`;

// ============================================================================
// 3. TRANSLATIONS (ENGLISH & ARABIC RTL SUPPORT) & FORMATTERS
// ============================================================================
const I18N = {
  en: {
    brandName: 'CoolFix',
    brandTagline: 'AC Maintenance Management',
    selectRole: 'Select your role to continue',
    roleAdmin: 'Admin',
    roleAdminDesc: 'Manage complaints, assign teams, view reports',
    roleCustomer: 'Customer',
    roleCustomerDesc: 'Submit a new AC maintenance complaint',
    roleTeam: 'Team Leader',
    roleTeamDesc: 'View assigned tasks and update status',
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    complaints: 'Complaints',
    teams: 'Teams',
    locations: 'Locations',
    reports: 'Reports',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    logout: 'Logout',
    totalComplaints: 'Total Complaints',
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    dailyComplaints: 'Daily Complaints',
    statusTitle: 'Status',
    recentComplaints: 'Recent Complaints',
    viewAll: 'View all',
    teamPerformance: 'Team Performance',
    backToRoles: 'Back to Role Selection'
  },
  ar: {
    brandName: 'CoolFix',
    brandTagline: 'إدارة صيانة التكييف',
    selectRole: 'اختر دورك للمتابعة',
    roleAdmin: 'مدير النظام',
    roleAdminDesc: 'إدارة البلاغات، تعيين الفرق، وعرض التقارير',
    roleCustomer: 'العميل',
    roleCustomerDesc: 'تقديم بلاغ صيانة تكييف جديد أو تتبع الطلب',
    roleTeam: 'قائد الفريق',
    roleTeamDesc: 'عرض المهام المسندة وتحديث حالة الإنجاز',
    adminPanel: 'لوحة الإدارة',
    dashboard: 'لوحة القيادة',
    complaints: 'البلاغات',
    teams: 'الفرق',
    locations: 'المواقع',
    reports: 'التقارير',
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع النهاري',
    logout: 'تسجيل الخروج',
    totalComplaints: 'إجمالي البلاغات',
    pending: 'قيد الانتظار',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    dailyComplaints: 'البلاغات اليومية',
    statusTitle: 'الحالة',
    recentComplaints: 'أحدث البلاغات',
    viewAll: 'عرض الكل',
    teamPerformance: 'أداء الفرق',
    backToRoles: 'العودة لاختيار الدور'
  }
};

function formatKuwaitDateShort(isoString) {
  if (!isoString) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kuwait',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

function formatKuwaitDateTime(isoString) {
  if (!isoString) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kuwait',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

const STATUS_META = {
  pending: { label: 'Pending', badge: 'bg-amber-100 text-amber-800 border-amber-200', hex: '#F59E0B' },
  assigned: { label: 'Assigned', badge: 'bg-sky-100 text-sky-700 border-sky-200', hex: '#0284C7' },
  in_progress: { label: 'In Progress', badge: 'bg-purple-100 text-purple-700 border-purple-200', hex: '#8B5CF6' },
  completed: { label: 'Done', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', hex: '#10B981' }
};

const PRIORITY_META = {
  normal: { label: 'Normal', badge: 'bg-slate-100 text-slate-700' },
  high: { label: 'High', badge: 'bg-amber-100 text-amber-700' },
  urgent: { label: 'Urgent', badge: 'bg-rose-100 text-rose-700' }
};

const ISSUE_TYPES = [
  'Filter Replacement',
  'AC Leakage',
  'Compressor Failure',
  'Complete Service',
  'Gas Refill',
  'AC Not Cooling',
  'Thermostat Issue'
];

// ============================================================================
// 4. SNOWFLAKE TILE PATTERN BACKGROUND (Matches Role Selector Screen)
// ============================================================================
function SnowflakeLandingWrapper({ children, lang, onToggleLang, onOpenSupabaseModal, connectionStatus }) {
  const svgPattern = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84">
      <g stroke="rgba(255,255,255,0.065)" stroke-width="1.4" fill="none" stroke-linecap="round">
        <line x1="42" y1="16" x2="42" y2="68"/>
        <line x1="16" y1="42" x2="68" y2="42"/>
        <line x1="23.6" y1="23.6" x2="60.4" y2="60.4"/>
        <line x1="60.4" y1="23.6" x2="23.6" y2="60.4"/>
        <polyline points="37,22 42,27 47,22"/>
        <polyline points="37,62 42,57 47,62"/>
        <polyline points="22,37 27,42 22,47"/>
        <polyline points="62,37 57,42 62,47"/>
      </g>
    </svg>
  `);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen w-full flex flex-col justify-between relative overflow-hidden text-white select-none"
      style={{
        background: 'linear-gradient(135deg, #1b93df 0%, #1d64d8 52%, #1d57c9 100%)',
        backgroundImage: `url("data:image/svg+xml,${svgPattern}"), linear-gradient(135deg, #1b93df 0%, #1d64d8 52%, #1d57c9 100%)`
      }}
    >
      <div className="w-full px-6 pt-5 flex items-center justify-between z-10">
        <button
          onClick={onOpenSupabaseModal}
          className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-xs font-medium flex items-center gap-2 transition"
        >
          <Database className="w-3.5 h-3.5 text-sky-200" />
          <span>{connectionStatus === 'connected' ? 'Supabase Live' : 'Connect Supabase'}</span>
          <span
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-emerald-300' : 'bg-amber-300 animate-pulse'
            }`}
          />
        </button>

        <button
          onClick={onToggleLang}
          className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-xs font-semibold flex items-center gap-2 transition"
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 z-10">
        {children}
      </div>

      <div className="pb-4 text-center text-[11px] text-white/60 z-10">
        CoolFix AC Maintenance System • Asia/Kuwait • Supabase Realtime &amp; RLS
      </div>
    </div>
  );
}

// ============================================================================
// 5. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const t = I18N[lang];

  const [view, setView] = useState('role_select');
  const [authUser, setAuthUser] = useState(null);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('ac_sb_url') || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(() => localStorage.getItem('ac_sb_anon') || '');
  const [supabaseClient, setSupabaseClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [connectionError, setConnectionError] = useState('');
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [setupTab, setSetupTab] = useState('connect');

  const [areas, setAreas] = useState(INITIAL_AREAS);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [statusHistory, setStatusHistory] = useState(INITIAL_STATUS_HISTORY);
  const [notes, setNotes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [systemSettings, setSystemSettings] = useState(INITIAL_SETTINGS);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 3800 ? null : prev));
    }, 4000);
  };

  useEffect(() => {
    if (!window.supabase) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.async = true;
      document.head.appendChild(s);
    }
    if (!window.XLSX) {
      const x = document.createElement('script');
      x.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      x.async = true;
      document.head.appendChild(x);
    }
  }, []);

  const connectToSupabase = async (urlToUse, keyToUse) => {
    const cleanUrl = (urlToUse || '').trim();
    const cleanKey = (keyToUse || '').trim();
    if (!cleanUrl || !cleanKey) {
      setSupabaseClient(null);
      setConnectionStatus('disconnected');
      return;
    }

    setConnectionStatus('connecting');
    setConnectionError('');
    try {
      let retries = 0;
      while (!window.supabase && retries < 15) {
        await new Promise((r) => setTimeout(r, 200));
        retries++;
      }
      if (!window.supabase) throw new Error('Supabase SDK failed to load.');

      const client = window.supabase.createClient(cleanUrl, cleanKey, {
        auth: { persistSession: true, autoRefreshToken: true }
      });

      const { error } = await client.rpc('get_public_locations');
      if (error && error.message && error.message.includes('Failed to fetch')) {
        throw new Error('Could not reach Supabase URL.');
      }

      localStorage.setItem('ac_sb_url', cleanUrl);
      localStorage.setItem('ac_sb_anon', cleanKey);
      setSupabaseUrl(cleanUrl);
      setSupabaseAnonKey(cleanKey);
      setSupabaseClient(client);
      setConnectionStatus('connected');
      showToast('Connected to live Supabase backend!', 'success');
    } catch (err) {
      setConnectionStatus('error');
      setConnectionError(err.message || 'Connection failed');
      showToast(`Connection failed: ${err.message}`, 'error');
    }
  };

  useEffect(() => {
    if (supabaseUrl && supabaseAnonKey) {
      connectToSupabase(supabaseUrl, supabaseAnonKey);
    }
  }, []);

  const fetchAllSupabaseData = async (client, currentUser) => {
    if (!client) return;
    try {
      const { data: pubLocs } = await client.rpc('get_public_locations');
      if (pubLocs && pubLocs.length > 0) {
        const areaMap = new Map();
        pubLocs.forEach((r) => areaMap.set(r.area_id, { id: r.area_id, area_name: r.area_name }));
        setAreas(Array.from(areaMap.values()));
      }
      if (!currentUser) return;

      const [
        { data: dbComplaints },
        { data: dbTeams },
        { data: dbMembers },
        { data: dbLocations },
        { data: dbAreas },
        { data: dbCompanies },
        { data: dbAssignments },
        { data: dbHistory },
        { data: dbNotes },
        { data: dbPhotos },
        { data: dbSettings }
      ] = await Promise.all([
        client.from('complaints').select('*').order('created_at', { ascending: false }),
        client.from('teams').select('*').order('team_name'),
        client.from('team_members').select('*'),
        client.from('locations').select('*').order('branch_name'),
        client.from('areas').select('*').order('area_name'),
        client.from('companies').select('*'),
        client.from('complaint_assignments').select('*').order('assigned_at', { ascending: false }),
        client.from('complaint_status_history').select('*').order('created_at', { ascending: true }),
        client.from('complaint_notes').select('*').order('created_at', { ascending: true }),
        client.from('complaint_photos').select('*').order('created_at', { ascending: true }),
        client.from('system_settings').select('*').limit(1)
      ]);

      if (dbComplaints) setComplaints(dbComplaints);
      if (dbTeams) setTeams(dbTeams);
      if (dbMembers) setTeamMembers(dbMembers);
      if (dbLocations) setLocations(dbLocations);
      if (dbAreas) setAreas(dbAreas);
      if (dbCompanies) setCompanies(dbCompanies);
      if (dbAssignments) setAssignments(dbAssignments);
      if (dbHistory) setStatusHistory(dbHistory);
      if (dbNotes) setNotes(dbNotes);
      if (dbPhotos) setPhotos(dbPhotos);
      if (dbSettings && dbSettings[0]) setSystemSettings(dbSettings[0]);
    } catch (err) {
      console.error('Supabase sync error:', err);
    }
  };

  useEffect(() => {
    if (!supabaseClient || connectionStatus !== 'connected') return;
    fetchAllSupabaseData(supabaseClient, authUser);

    const channel = supabaseClient
      .channel('coolfix-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'complaints' }, () =>
        fetchAllSupabaseData(supabaseClient, authUser)
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, () =>
        fetchAllSupabaseData(supabaseClient, authUser)
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'locations' }, () =>
        fetchAllSupabaseData(supabaseClient, authUser)
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [supabaseClient, connectionStatus, authUser]);

  const handleLogin = async (e, targetRole) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (supabaseClient && connectionStatus === 'connected') {
        let email = loginIdentifier.trim();
        if (!email.includes('@')) email = `${email.toLowerCase()}@coolfix-kw.com`;
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password: loginPassword
        });
        if (error) throw error;

        const { data: profile, error: profErr } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        if (profErr || !profile) throw new Error('User profile missing.');
        if (!profile.is_active) {
          await supabaseClient.auth.signOut();
          throw new Error('Account deactivated by Administrator.');
        }
        setAuthUser(profile);
        setView(profile.role === 'admin' ? 'admin_app' : 'team_app');
        setLoginPassword('');
        showToast(
          profile.role === 'admin'
            ? 'Welcome Admin — You have full access to the dashboard'
            : `Welcome ${profile.full_name}`,
          'success'
        );
      } else {
        if (targetRole === 'admin') {
          if (
            (loginIdentifier.toLowerCase() === 'admin' || loginIdentifier.toLowerCase() === 'admin@coolfix-kw.com') &&
            loginPassword === 'admin123'
          ) {
            setAuthUser({
              id: 'admin-1',
              full_name: 'Admin Supervisor',
              username: 'admin',
              role: 'admin',
              team_id: null
            });
            setView('admin_app');
            setLoginPassword('');
            showToast('Welcome Admin — You have full access to the dashboard', 'success');
          } else {
            throw new Error('Demo Admin: username "admin" • password "admin123"');
          }
        } else {
          const team = teams.find(
            (tm) => tm.login_username.toLowerCase() === loginIdentifier.trim().toLowerCase()
          );
          if (!team) throw new Error('Try "team_alpha", "team_bravo", "team_charlie", or "team_delta"');
          if (!team.is_active) throw new Error('This team account is deactivated.');
          if (loginPassword !== 'team123') throw new Error('Demo Team password is "team123"');
          setAuthUser({
            id: `user-${team.id}`,
            full_name: team.team_leader_name,
            username: team.login_username,
            role: 'team',
            team_id: team.id
          });
          setView('team_app');
          setLoginPassword('');
        }
      }
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (supabaseClient && connectionStatus === 'connected') {
      await supabaseClient.auth.signOut();
    }
    setAuthUser(null);
    setView('role_select');
    showToast('Logged out', 'info');
  };

  const generateNextTicketNumber = () => {
    const year = new Date().getFullYear();
    const prefix = `AC-${year}-`;
    let maxNum = 0;
    complaints.forEach((c) => {
      if (c.ticket_number && c.ticket_number.startsWith(prefix)) {
        const num = parseInt(c.ticket_number.replace(prefix, ''), 10);
        if (!isNaN(num) && num > maxNum) maxNum = num;
      }
    });
    return `${prefix}${String(maxNum + 1).padStart(4, '0')}`;
  };

  const handleCustomerSubmitComplaint = async (formData) => {
    const loc = locations.find((l) => l.id === formData.location_id);
    if (!loc) return null;

    if (supabaseClient && connectionStatus === 'connected') {
      const { data, error } = await supabaseClient.rpc('submit_public_complaint', {
        p_location_id: formData.location_id,
        p_contact_person: formData.contact_person,
        p_contact_phone: formData.contact_phone,
        p_issue_type: formData.issue_type,
        p_priority: formData.priority,
        p_description: formData.description
      });
      if (error) {
        showToast(error.message, 'error');
        return null;
      }
      showToast(`Ticket ${data.ticket_number} submitted!`, 'success');
      return data.ticket_number;
    } else {
      const ticketNumber = generateNextTicketNumber();
      const nowIso = new Date().toISOString();
      const newId = `cmp-${Date.now()}`;
      setComplaints((prev) => [
        {
          id: newId,
          ticket_number: ticketNumber,
          company_id: loc.company_id,
          location_id: loc.id,
          area_id: loc.area_id,
          contact_person: formData.contact_person,
          contact_phone: formData.contact_phone,
          priority: formData.priority,
          issue_type: formData.issue_type,
          description: formData.description,
          status: 'pending',
          assigned_team_id: null,
          created_at: nowIso,
          updated_at: nowIso,
          assigned_at: null,
          started_at: null,
          completed_at: null,
          completion_notes: ''
        },
        ...prev
      ]);
      setStatusHistory((prev) => [
        ...prev,
        { id: `sh-${Date.now()}`, complaint_id: newId, previous_status: null, new_status: 'pending', notes: 'Submitted via Customer Portal', created_at: nowIso }
      ]);
      showToast(`Complaint registered: ${ticketNumber}`, 'success');
      return ticketNumber;
    }
  };

  const handleAssignTeam = async (complaintId, teamId, assignmentNotes, newPriority) => {
    const nowIso = new Date().toISOString();
    const targetTeam = teams.find((tm) => tm.id === teamId);
    const complaint = complaints.find((c) => c.id === complaintId);
    if (!targetTeam || !complaint) return;

    if (supabaseClient && connectionStatus === 'connected') {
      await supabaseClient
        .from('complaint_assignments')
        .update({ is_current: false, unassigned_at: nowIso })
        .eq('complaint_id', complaintId)
        .eq('is_current', true);
      await supabaseClient.from('complaint_assignments').insert({
        complaint_id: complaintId,
        team_id: teamId,
        assigned_by: authUser?.id || null,
        assignment_notes: assignmentNotes,
        assigned_at: nowIso,
        is_current: true
      });
      const nextStatus = complaint.status === 'pending' ? 'assigned' : complaint.status;
      await supabaseClient
        .from('complaints')
        .update({
          assigned_team_id: teamId,
          status: nextStatus,
          priority: newPriority || complaint.priority,
          assigned_at: nowIso
        })
        .eq('id', complaintId);
      await fetchAllSupabaseData(supabaseClient, authUser);
    } else {
      setAssignments((prev) => [
        ...prev.map((a) =>
          a.complaint_id === complaintId && a.is_current
            ? { ...a, is_current: false, unassigned_at: nowIso }
            : a
        ),
        {
          id: `asg-${Date.now()}`,
          complaint_id: complaintId,
          team_id: teamId,
          assigned_by: authUser?.full_name || 'Admin',
          assignment_notes: assignmentNotes,
          assigned_at: nowIso,
          unassigned_at: null,
          is_current: true
        }
      ]);
      const nextStatus = complaint.status === 'pending' ? 'assigned' : complaint.status;
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === complaintId
            ? {
                ...c,
                assigned_team_id: teamId,
                status: nextStatus,
                priority: newPriority || c.priority,
                assigned_at: nowIso
              }
            : c
        )
      );
      if (complaint.status !== nextStatus) {
        setStatusHistory((prev) => [
          ...prev,
          { id: `sh-${Date.now()}`, complaint_id: complaintId, previous_status: complaint.status, new_status: nextStatus, notes: `Assigned to ${targetTeam.team_name}`, created_at: nowIso }
        ]);
      }
    }
    showToast(`Assigned ${complaint.ticket_number} to ${targetTeam.team_name}`, 'success');
  };

  const handleStartProgress = async (complaintId) => {
    const nowIso = new Date().toISOString();
    const complaint = complaints.find((c) => c.id === complaintId);
    if (!complaint) return;

    if (supabaseClient && connectionStatus === 'connected') {
      await supabaseClient.from('complaints').update({ status: 'in_progress', started_at: nowIso }).eq('id', complaintId);
      await fetchAllSupabaseData(supabaseClient, authUser);
    } else {
      setComplaints((prev) =>
        prev.map((c) => (c.id === complaintId ? { ...c, status: 'in_progress', started_at: nowIso } : c))
      );
      setStatusHistory((prev) => [
        ...prev,
        { id: `sh-${Date.now()}`, complaint_id: complaintId, previous_status: complaint.status, new_status: 'in_progress', notes: 'Work started on site', created_at: nowIso }
      ]);
    }
    showToast(`${complaint.ticket_number} is now In Progress`, 'success');
  };

  const handleCompleteWork = async (complaintId, completionNotes) => {
    if (!completionNotes?.trim()) {
      showToast('Please enter completion notes first.', 'error');
      return;
    }
    const nowIso = new Date().toISOString();
    const complaint = complaints.find((c) => c.id === complaintId);
    if (!complaint) return;

    if (supabaseClient && connectionStatus === 'connected') {
      await supabaseClient
        .from('complaints')
        .update({ status: 'completed', completed_at: nowIso, completion_notes: completionNotes.trim() })
        .eq('id', complaintId);
      await fetchAllSupabaseData(supabaseClient, authUser);
    } else {
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === complaintId
            ? { ...c, status: 'completed', completed_at: nowIso, completion_notes: completionNotes.trim() }
            : c
        )
      );
      setStatusHistory((prev) => [
        ...prev,
        { id: `sh-${Date.now()}`, complaint_id: complaintId, previous_status: complaint.status, new_status: 'completed', notes: completionNotes.trim(), created_at: nowIso }
      ]);
    }
    showToast(`${complaint.ticket_number} marked as Done!`, 'success');
  };

  const handlePhotoUpload = async (complaintId, photoType, file) => {
    if (!file) return;
    const complaint = complaints.find((c) => c.id === complaintId);
    if (!complaint) return;
    const bucketName = photoType === 'before' ? 'complaint-before-photos' : 'complaint-after-photos';
    const filePath = `${complaint.ticket_number}/${photoType}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    if (supabaseClient && connectionStatus === 'connected') {
      const { error } = await supabaseClient.storage.from(bucketName).upload(filePath, file);
      if (error) {
        showToast(error.message, 'error');
        return;
      }
      const { data: signed } = await supabaseClient.storage.from(bucketName).createSignedUrl(filePath, 3600);
      await supabaseClient.from('complaint_photos').insert({
        complaint_id: complaintId,
        team_id: authUser?.team_id || complaint.assigned_team_id,
        photo_type: photoType,
        storage_path: filePath,
        uploaded_by: authUser?.id || null
      });
      setPhotos((prev) => [
        ...prev,
        { id: `ph-${Date.now()}`, complaint_id: complaintId, photo_type: photoType, storage_path: filePath, preview_url: signed?.signedUrl || '' }
      ]);
      showToast(`Uploaded ${photoType} photo`, 'success');
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => [
          ...prev,
          { id: `ph-${Date.now()}`, complaint_id: complaintId, photo_type: photoType, storage_path: filePath, preview_url: reader.result }
        ]);
        showToast(`Attached ${photoType} photo`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInternalNote = async (complaintId, noteText) => {
    if (!noteText.trim()) return;
    const nowIso = new Date().toISOString();
    if (supabaseClient && connectionStatus === 'connected') {
      await supabaseClient.from('complaint_notes').insert({
        complaint_id: complaintId,
        team_id: authUser?.team_id || null,
        user_id: authUser?.id || null,
        note: noteText.trim()
      });
      await fetchAllSupabaseData(supabaseClient, authUser);
    } else {
      setNotes((prev) => [
        ...prev,
        { id: `note-${Date.now()}`, complaint_id: complaintId, user_name: authUser?.full_name || 'Staff', note: noteText.trim(), created_at: nowIso }
      ]);
    }
    showToast('Internal note added', 'success');
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen font-sans antialiased">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold ${
              toast.type === 'error'
                ? 'bg-rose-950 text-rose-100 border-rose-700'
                : toast.type === 'success'
                ? 'bg-emerald-950 text-emerald-100 border-emerald-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)}>
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        </div>
      )}

      {view === 'role_select' && (
        <SnowflakeLandingWrapper
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
          onOpenSupabaseModal={() => setShowSetupModal(true)}
          connectionStatus={connectionStatus}
        >
          <div className="w-full max-w-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center shadow-lg mb-5">
              <Snowflake className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">{t.brandName}</h1>
            <p className="text-sm text-white/85 mt-1">{t.brandTagline}</p>
            <p className="text-xs text-white/75 mt-5 mb-6">{t.selectRole}</p>

            <div className="w-full space-y-3.5">
              <button
                onClick={() => {
                  setLoginIdentifier('admin');
                  setLoginPassword('admin123');
                  setView('login_admin');
                }}
                className="w-full p-4 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-between text-left transition group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.roleAdmin}</div>
                    <div className="text-xs text-white/75 mt-0.5">{t.roleAdminDesc}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition" />
              </button>

              <button
                onClick={() => setView('customer_portal')}
                className="w-full p-4 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-between text-left transition group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.roleCustomer}</div>
                    <div className="text-xs text-white/75 mt-0.5">{t.roleCustomerDesc}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition" />
              </button>

              <button
                onClick={() => {
                  setLoginIdentifier('team_alpha');
                  setLoginPassword('team123');
                  setView('login_team');
                }}
                className="w-full p-4 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-between text-left transition group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.roleTeam}</div>
                    <div className="text-xs text-white/75 mt-0.5">{t.roleTeamDesc}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
        </SnowflakeLandingWrapper>
      )}

      {view === 'login_admin' && (
        <SnowflakeLandingWrapper
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
          onOpenSupabaseModal={() => setShowSetupModal(true)}
          connectionStatus={connectionStatus}
        >
          <div className="w-full max-w-md bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-7 shadow-2xl">
            <button
              onClick={() => setView('role_select')}
              className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white mb-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToRoles}</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{t.roleAdmin} Login</h2>
                <p className="text-xs text-white/75">{t.roleAdminDesc}</p>
              </div>
            </div>

            <form onSubmit={(e) => handleLogin(e, 'admin')} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-white/90 mb-1">Username or Email</label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-white/90 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              {connectionStatus !== 'connected' && (
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-[11px] text-white/85">
                  Sandbox Demo: <strong>admin</strong> / <strong>admin123</strong>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-white text-[#1d57c9] hover:bg-sky-50 font-bold text-sm shadow transition disabled:opacity-60"
              >
                {authLoading ? 'Signing in...' : 'Sign In to Admin Panel'}
              </button>
            </form>
          </div>
        </SnowflakeLandingWrapper>
      )}

      {view === 'login_team' && (
        <SnowflakeLandingWrapper
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
          onOpenSupabaseModal={() => setShowSetupModal(true)}
          connectionStatus={connectionStatus}
        >
          <div className="w-full max-w-md bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-7 shadow-2xl">
            <button
              onClick={() => setView('role_select')}
              className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white mb-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToRoles}</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{t.roleTeam} Login</h2>
                <p className="text-xs text-white/75">{t.roleTeamDesc}</p>
              </div>
            </div>

            <form onSubmit={(e) => handleLogin(e, 'team')} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-white/90 mb-1">Team Login Username</label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="team_alpha"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 font-mono outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-white/90 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/95 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              {connectionStatus !== 'connected' && (
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-[11px] text-white/85">
                  Sandbox Demo Teams: <strong>team_alpha</strong>, <strong>team_bravo</strong>, <strong>team_charlie</strong>, <strong>team_delta</strong> • Password: <strong>team123</strong>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-white text-[#1d57c9] hover:bg-sky-50 font-bold text-sm shadow transition disabled:opacity-60"
              >
                {authLoading ? 'Signing in...' : 'Sign In as Team Leader'}
              </button>
            </form>
          </div>
        </SnowflakeLandingWrapper>
      )}

      {view === 'customer_portal' && (
        <CustomerPortalView
          t={t}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
          onBackToRoles={() => setView('role_select')}
          locations={locations}
          complaints={complaints}
          teams={teams}
          supabaseClient={supabaseClient}
          connectionStatus={connectionStatus}
          onSubmitComplaint={handleCustomerSubmitComplaint}
        />
      )}

      {view === 'admin_app' && authUser && (
        <AdminWorkspace
          t={t}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          authUser={authUser}
          onLogout={handleLogout}
          onOpenSupabaseModal={() => setShowSetupModal(true)}
          connectionStatus={connectionStatus}
          complaints={complaints}
          teams={teams}
          setTeams={setTeams}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          locations={locations}
          setLocations={setLocations}
          areas={areas}
          companies={companies}
          assignments={assignments}
          notes={notes}
          systemSettings={systemSettings}
          supabaseClient={supabaseClient}
          onAssignTeam={handleAssignTeam}
          onAddNote={handleAddInternalNote}
          onCreateComplaint={handleCustomerSubmitComplaint}
          showToast={showToast}
        />
      )}

      {view === 'team_app' && authUser && (
        <TeamLeaderWorkspace
          t={t}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          team={teams.find((tm) => tm.id === authUser.team_id)}
          complaints={complaints.filter((c) => c.assigned_team_id === authUser.team_id)}
          locations={locations}
          areas={areas}
          companies={companies}
          notes={notes}
          photos={photos}
          onStartProgress={handleStartProgress}
          onCompleteWork={handleCompleteWork}
          onUploadPhoto={handlePhotoUpload}
          onAddNote={handleAddInternalNote}
          onLogout={handleLogout}
        />
      )}

      {showSetupModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-sky-400" />
                <div>
                  <h2 className="font-bold text-sm">CoolFix Supabase PostgreSQL &amp; Realtime Setup</h2>
                  <p className="text-xs text-slate-400">Connect your Supabase URL &amp; Anon Key or copy the full SQL schema</p>
                </div>
              </div>
              <button onClick={() => setShowSetupModal(false)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
              <button
                onClick={() => setSetupTab('connect')}
                className={`px-4 py-2 text-xs font-bold rounded-t-lg border-t border-x ${
                  setupTab === 'connect' ? 'bg-white text-sky-600 border-slate-200' : 'text-slate-600 border-transparent'
                }`}
              >
                1. Connect Supabase Project
              </button>
              <button
                onClick={() => setSetupTab('sql')}
                className={`px-4 py-2 text-xs font-bold rounded-t-lg border-t border-x ${
                  setupTab === 'sql' ? 'bg-white text-sky-600 border-slate-200' : 'text-slate-600 border-transparent'
                }`}
              >
                2. Copy Complete PostgreSQL Schema (RLS + Triggers + RPCs)
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {setupTab === 'connect' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Supabase Project URL</label>
                    <input
                      type="url"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://xyzcompany.supabase.co"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Supabase Publishable / Anon Key</label>
                    <input
                      type="password"
                      value={supabaseAnonKey}
                      onChange={(e) => setSupabaseAnonKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  {connectionError && <p className="text-xs text-rose-600 font-semibold">{connectionError}</p>}
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => {
                        localStorage.removeItem('ac_sb_url');
                        localStorage.removeItem('ac_sb_anon');
                        setSupabaseUrl('');
                        setSupabaseAnonKey('');
                        setSupabaseClient(null);
                        setConnectionStatus('disconnected');
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
                    >
                      Use Sandbox Mode
                    </button>
                    <button
                      onClick={() => connectToSupabase(supabaseUrl, supabaseAnonKey)}
                      className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                    >
                      Save &amp; Connect
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Run in Supabase SQL Editor:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
                        showToast('SQL Schema copied!', 'success');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
                    >
                      Copy SQL
                    </button>
                  </div>
                  <pre className="bg-slate-950 text-emerald-300 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-80">
                    {SUPABASE_SCHEMA_SQL}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 6. ADMIN WORKSPACE (Dashboard, Complaints, Teams, Locations, Reports)
// ============================================================================
function AdminWorkspace({
  t,
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  authUser,
  onLogout,
  onOpenSupabaseModal,
  connectionStatus,
  complaints,
  teams,
  setTeams,
  teamMembers,
  setTeamMembers,
  locations,
  setLocations,
  areas,
  companies,
  assignments,
  notes,
  systemSettings,
  supabaseClient,
  onAssignTeam,
  onAddNote,
  onCreateComplaint,
  showToast
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [inspectComplaintId, setInspectComplaintId] = useState(null);
  const [assignTeamId, setAssignTeamId] = useState('');
  const [assignNotes, setAssignNotes] = useState('');
  const [assignPriority, setAssignPriority] = useState('normal');
  const [adminPrivateNote, setAdminPrivateNote] = useState('');

  const [showNewComplaintModal, setShowNewComplaintModal] = useState(false);
  const [ncLocationId, setNcLocationId] = useState(locations[0]?.id || '');
  const [ncContactPerson, setNcContactPerson] = useState('');
  const [ncContactPhone, setNcContactPhone] = useState('');
  const [ncIssueType, setNcIssueType] = useState(ISSUE_TYPES[0]);
  const [ncPriority, setNcPriority] = useState('normal');
  const [ncDescription, setNcDescription] = useState('');

  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedYear, setSelectedYear] = useState(2026);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [expandedTeamId, setExpandedTeamId] = useState(teams[0]?.id || 'team-alpha');
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamLeader, setNewTeamLeader] = useState('');
  const [newTeamPhone, setNewTeamPhone] = useState('');
  const [newTeamUsername, setNewTeamUsername] = useState('');
  const [memberInputs, setMemberInputs] = useState({});

  const [locSearchQuery, setLocSearchQuery] = useState('');
  const [locAreaFilter, setLocAreaFilter] = useState('all');
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchAreaId, setNewBranchAreaId] = useState(areas[0]?.id || '');
  const [newBranchCompanyId, setNewBranchCompanyId] = useState(companies[0]?.id || '');
  const [newBranchAddress, setNewBranchAddress] = useState('');
  const [newBranchManager, setNewBranchManager] = useState('');
  const [newBranchPhone, setNewBranchPhone] = useState('');

  const inspectComplaint = useMemo(
    () => complaints.find((c) => c.id === inspectComplaintId) || null,
    [complaints, inspectComplaintId]
  );

  const kpis = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === 'pending').length;
    const assigned = complaints.filter((c) => c.status === 'assigned').length;
    const inProgress = complaints.filter((c) => c.status === 'in_progress').length;
    const completed = complaints.filter((c) => c.status === 'completed').length;
    return { total, pending, assigned, inProgress, completed };
  }, [complaints]);

  const statusDonutData = useMemo(
    () => [
      { name: 'Pending', value: kpis.pending || 1, color: '#F59E0B' },
      { name: 'Assigned', value: kpis.assigned || 1, color: '#0284C7' },
      { name: 'In Progress', value: kpis.inProgress || 1, color: '#8B5CF6' },
      { name: 'Done', value: kpis.completed || 1, color: '#10B981' }
    ],
    [kpis]
  );

  const dailyComplaintsData = useMemo(() => {
    const dayMap = {};
    complaints.forEach((c) => {
      const day = new Date(c.created_at).getDate();
      if (!dayMap[day]) dayMap[day] = { day: String(day), Complaints: 0, Done: 0 };
      dayMap[day].Complaints += 1;
      if (c.status === 'completed') dayMap[day].Done += 1;
    });
    const sorted = Object.values(dayMap).sort((a, b) => Number(a.day) - Number(b.day));
    return sorted.length ? sorted : [{ day: '25', Complaints: 1, Done: 0 }];
  }, [complaints]);

  const teamStatsList = useMemo(() => {
    return teams.map((tm, index) => {
      const teamCmps = complaints.filter((c) => c.assigned_team_id === tm.id);
      const done = teamCmps.filter((c) => c.status === 'completed').length;
      const pending = teamCmps.filter((c) => c.status === 'pending').length;
      const inProg = teamCmps.filter((c) => c.status === 'in_progress' || c.status === 'assigned').length;
      return {
        ...tm,
        rank: index + 1,
        total: teamCmps.length,
        done,
        pending,
        inProg
      };
    });
  }, [teams, complaints]);

  const monthlyReportData = useMemo(() => {
    const filtered = complaints.filter((c) => {
      const d = new Date(c.created_at);
      return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
    });

    const total = filtered.length;
    const completed = filtered.filter((c) => c.status === 'completed').length;
    const pending = filtered.filter((c) => c.status === 'pending').length;
    const inProgress = filtered.filter((c) => c.status === 'in_progress' || c.status === 'assigned').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const dailyLine = Array.from({ length: daysInMonth }, (_, i) => {
      const dayNum = i + 1;
      const dayCmps = filtered.filter((c) => new Date(c.created_at).getDate() === dayNum);
      return {
        day: dayNum,
        Complaints: dayCmps.length,
        Done: dayCmps.filter((c) => c.status === 'completed').length
      };
    });

    const byTeam = teams.map((tm, idx) => {
      const tCmps = filtered.filter((c) => c.assigned_team_id === tm.id);
      const tDone = tCmps.filter((c) => c.status === 'completed').length;
      const tPending = tCmps.filter((c) => c.status === 'pending').length;
      const tInProg = tCmps.filter((c) => c.status === 'in_progress' || c.status === 'assigned').length;
      return {
        rank: idx + 1,
        team_name: tm.team_name,
        leader: tm.team_leader_name,
        total: tCmps.length,
        Done: tDone,
        Pending: tPending,
        'In Progress': tInProg,
        rate: tCmps.length > 0 ? Math.round((tDone / tCmps.length) * 100) : 0
      };
    });

    const issueCounts = {};
    filtered.forEach((c) => {
      issueCounts[c.issue_type] = (issueCounts[c.issue_type] || 0) + 1;
    });
    const byIssue = Object.entries(issueCounts).map(([name, value]) => ({ name, value }));

    const areaCounts = {};
    filtered.forEach((c) => {
      const aName = areas.find((a) => a.id === c.area_id)?.area_name || 'Other';
      areaCounts[aName] = (areaCounts[aName] || 0) + 1;
    });
    const byArea = Object.entries(areaCounts).map(([area, count]) => ({ area, count }));

    return {
      filtered,
      total,
      completed,
      pending,
      inProgress,
      completionRate,
      dailyLine,
      byTeam,
      byIssue,
      byArea
    };
  }, [complaints, teams, areas, selectedMonth, selectedYear]);

  const handleExportExcel = () => {
    if (!window.XLSX) {
      showToast('Excel generator loading, retry in 2 seconds...', 'info');
      return;
    }
    const wb = window.XLSX.utils.book_new();
    const monthName = new Date(selectedYear, selectedMonth - 1, 1).toLocaleString('en-US', { month: 'long' });

    const summarySheet = window.XLSX.utils.aoa_to_sheet([
      ['Company', systemSettings.company_name],
      ['Month / Year', `${monthName} ${selectedYear}`],
      ['Total Complaints', monthlyReportData.total],
      ['Completed', monthlyReportData.completed],
      ['Pending', monthlyReportData.pending],
      ['In Progress / Assigned', monthlyReportData.inProgress],
      ['Completion Rate', `${monthlyReportData.completionRate}%`]
    ]);
    window.XLSX.utils.book_append_sheet(wb, summarySheet, '1. Monthly Summary');

    const teamSheet = window.XLSX.utils.aoa_to_sheet([
      ['Rank', 'Team', 'Leader', 'Total', 'Done', 'Pending', 'In Progress', 'Completion %'],
      ...monthlyReportData.byTeam.map((tm) => [
        tm.rank,
        tm.team_name,
        tm.leader,
        tm.total,
        tm.Done,
        tm.Pending,
        tm['In Progress'],
        `${tm.rate}%`
      ])
    ]);
    window.XLSX.utils.book_append_sheet(wb, teamSheet, '2. Team Performance');

    const detailsSheet = window.XLSX.utils.aoa_to_sheet([
      ['Ticket #', 'Company', 'Issue', 'Area', 'Team', 'Priority', 'Status', 'Date'],
      ...monthlyReportData.filtered.map((c) => [
        c.ticket_number,
        companies.find((co) => co.id === c.company_id)?.company_name || '',
        c.issue_type,
        areas.find((a) => a.id === c.area_id)?.area_name || '',
        teams.find((tm) => tm.id === c.assigned_team_id)?.team_name || '—',
        c.priority,
        c.status,
        formatKuwaitDateShort(c.created_at)
      ])
    ]);
    window.XLSX.utils.book_append_sheet(wb, detailsSheet, '3. Complaint Details');

    const issueSheet = window.XLSX.utils.aoa_to_sheet([
      ['Issue Type', 'Count'],
      ...monthlyReportData.byIssue.map((i) => [i.name, i.value])
    ]);
    window.XLSX.utils.book_append_sheet(wb, issueSheet, '4. Issue Type Analysis');

    const areaSheet = window.XLSX.utils.aoa_to_sheet([
      ['Area', 'Complaints'],
      ...monthlyReportData.byArea.map((a) => [a.area, a.count])
    ]);
    window.XLSX.utils.book_append_sheet(wb, areaSheet, '5. Area Performance');

    window.XLSX.writeFile(wb, `CoolFix_Monthly_Report_${monthName}_${selectedYear}.xlsx`);
    showToast(`Exported CoolFix_Monthly_Report_${monthName}_${selectedYear}.xlsx`, 'success');
  };

  const shellBg = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900';
  const sidebarBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#f4f6f9] border-slate-200/80';
  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90';

  const filteredComplaintsList = useMemo(() => {
    return complaints.filter((c) => {
      if (filterStatus !== 'all' && c.status !== filterStatus) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const compName = (companies.find((co) => co.id === c.company_id)?.company_name || '').toLowerCase();
      const areaName = (areas.find((a) => a.id === c.area_id)?.area_name || '').toLowerCase();
      return (
        c.ticket_number.toLowerCase().includes(q) ||
        compName.includes(q) ||
        areaName.includes(q) ||
        c.issue_type.toLowerCase().includes(q)
      );
    });
  }, [complaints, filterStatus, searchQuery, companies, areas]);

  const filteredLocationsList = useMemo(() => {
    return locations.filter((loc) => {
      if (locAreaFilter !== 'all' && loc.area_id !== locAreaFilter) return false;
      if (!locSearchQuery.trim()) return true;
      const q = locSearchQuery.toLowerCase();
      const compName = (companies.find((co) => co.id === loc.company_id)?.company_name || '').toLowerCase();
      const areaName = (areas.find((a) => a.id === loc.area_id)?.area_name || '').toLowerCase();
      return (
        loc.branch_name.toLowerCase().includes(q) ||
        compName.includes(q) ||
        areaName.includes(q) ||
        loc.full_address.toLowerCase().includes(q)
      );
    });
  }, [locations, locAreaFilter, locSearchQuery, companies, areas]);

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${shellBg}`}>
      <aside className={`w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r flex flex-col justify-between ${sidebarBg}`}>
        <div>
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0088e8] flex items-center justify-center text-white shadow-sm">
                <Snowflake className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">{t.brandName}</div>
                <div className="text-[11px] text-slate-500">{t.adminPanel}</div>
              </div>
            </div>
            <button
              onClick={onOpenSupabaseModal}
              title="Supabase Status"
              className={`w-2.5 h-2.5 rounded-full ${
                connectionStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
            />
          </div>

          <nav className="px-3 space-y-1">
            {[
              { id: 'dashboard', label: t.dashboard, icon: LayoutGrid },
              { id: 'complaints', label: t.complaints, icon: Wrench },
              { id: 'teams', label: t.teams, icon: Users },
              { id: 'locations', label: t.locations, icon: MapPin },
              { id: 'reports', label: t.reports, icon: BarChart3 }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? darkMode
                        ? 'bg-slate-800 text-white'
                        : 'bg-[#e6ebf1] text-slate-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-200/50 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-200/70 dark:border-slate-800 space-y-1">
          <button
            onClick={onToggleLang}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/50 dark:text-slate-400"
          >
            <Languages className="w-4 h-4" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/50 dark:text-slate-400"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{darkMode ? t.lightMode : t.darkMode}</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50/70 dark:text-slate-400"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
        {activeNav === 'dashboard' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {kpis.pending > 0 && (
              <button onClick={() => { setActiveNav('complaints'); setFilterStatus('pending'); }} className="w-full text-left p-4 rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 transition flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center"><AlertCircle className="w-5 h-5" /></span>
                  <span><strong className="block text-sm text-amber-900">New customer complaints need attention</strong><span className="text-xs text-amber-800">{kpis.pending} complaint(s) are waiting for team assignment.</span></span>
                </div>
                <span className="text-xs font-bold text-amber-800">Review now →</span>
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-5 rounded-2xl border-2 border-sky-200/90 shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{kpis.total}</div>
                <div className="text-xs text-slate-500 mt-1">{t.totalComplaints}</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{kpis.pending}</div>
                <div className="text-xs text-slate-500 mt-1">{t.pending}</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{kpis.inProgress}</div>
                <div className="text-xs text-slate-500 mt-1">{t.inProgress}</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{kpis.completed}</div>
                <div className="text-xs text-slate-500 mt-1">{t.completed}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className={`lg:col-span-8 p-6 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="w-4 h-4 text-sky-500" />
                  <h3 className="text-sm font-bold">{t.dailyComplaints}</h3>
                </div>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyComplaintsData} barSize={28}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip />
                      <Legend iconType="square" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Bar dataKey="Complaints" fill="#2da4dc" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Done" fill="#2ab673" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`lg:col-span-4 p-6 rounded-2xl border shadow-xs flex flex-col justify-between ${cardBg}`}>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-500" />
                  <h3 className="text-sm font-bold">{t.statusTitle}</h3>
                </div>
                <div className="h-48 my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusDonutData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3}>
                        {statusDonutData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600">
                  {statusDonutData.map((s) => (
                    <div key={s.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: s.color }} />
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className={`lg:col-span-8 p-6 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold">{t.recentComplaints}</h3>
                  <button
                    onClick={() => setActiveNav('complaints')}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <span>{t.viewAll}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {complaints.slice(0, 4).map((c) => {
                    const comp = companies.find((co) => co.id === c.company_id);
                    const loc = locations.find((l) => l.id === c.location_id);
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          setInspectComplaintId(c.id);
                          setAssignTeamId(c.assigned_team_id || teams[0]?.id || '');
                          setAssignPriority(c.priority);
                        }}
                        className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-sky-300 cursor-pointer transition flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-slate-500">{c.ticket_number}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${PRIORITY_META[c.priority]?.badge}`}>
                              {PRIORITY_META[c.priority]?.label}
                            </span>
                          </div>
                          <div className="font-bold text-sm mt-1">{comp?.company_name || loc?.branch_name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{c.description}</div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border ${STATUS_META[c.status]?.badge}`}>
                            {STATUS_META[c.status]?.label}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-1.5">{formatKuwaitDateShort(c.created_at)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`lg:col-span-4 p-6 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold">{t.teamPerformance}</h3>
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                </div>

                <div className="space-y-3">
                  {teamStatsList.map((tm) => (
                    <div
                      key={tm.id}
                      className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            tm.rank === 1 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tm.rank}
                        </div>
                        <div>
                          <div className="font-bold text-xs">{tm.team_name}</div>
                          <div className="text-[11px] text-slate-400">{tm.team_leader_name}</div>
                          <div className="text-[10px] mt-1 flex items-center gap-1.5">
                            <span className="text-slate-500">{tm.total} total</span>
                            <span>•</span>
                            <span className="text-emerald-600 font-semibold">{tm.done} done</span>
                            <span>•</span>
                            <span className="text-amber-600 font-semibold">{tm.pending} pending</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-base font-extrabold text-sky-600">{tm.total}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeNav === 'complaints' && (
          <div className="max-w-6xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">{t.complaints}</h1>
                <p className="text-xs text-slate-500 mt-0.5">{filteredComplaintsList.length} complaint(s)</p>
              </div>
              <button
                onClick={() => setShowNewComplaintModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0088e8] hover:bg-[#0074c7] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>New Complaint</span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ticket, company, issue..."
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-sky-400 ${cardBg}`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'pending', label: 'Pending' },
                  { id: 'assigned', label: 'Assigned' },
                  { id: 'in_progress', label: 'In Progress' },
                  { id: 'completed', label: 'Done' }
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setFilterStatus(pill.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                      filterStatus === pill.id
                        ? 'bg-[#0088e8] text-white shadow-xs'
                        : 'bg-[#eef2f6] dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border shadow-xs overflow-hidden ${cardBg}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-[11px] font-semibold text-slate-500">
                      <th className="py-3.5 px-4">Ticket</th>
                      <th className="py-3.5 px-4">Company</th>
                      <th className="py-3.5 px-4">Issue</th>
                      <th className="py-3.5 px-4">Area</th>
                      <th className="py-3.5 px-4">Team</th>
                      <th className="py-3.5 px-4">Priority</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {filteredComplaintsList.map((c) => {
                      const comp = companies.find((co) => co.id === c.company_id);
                      const area = areas.find((a) => a.id === c.area_id);
                      const team = teams.find((tm) => tm.id === c.assigned_team_id);
                      return (
                        <tr
                          key={c.id}
                          onClick={() => {
                            setInspectComplaintId(c.id);
                            setAssignTeamId(c.assigned_team_id || teams[0]?.id || '');
                            setAssignPriority(c.priority);
                          }}
                          className="hover:bg-slate-50/90 dark:hover:bg-slate-800/40 cursor-pointer transition"
                        >
                          <td className="py-3.5 px-4 font-mono text-[11px] font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {c.ticket_number}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            {comp?.company_name || '—'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            {c.issue_type}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                            {area?.area_name || '—'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {team ? team.team_name : '—'}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${PRIORITY_META[c.priority]?.badge}`}>
                              {PRIORITY_META[c.priority]?.label}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${STATUS_META[c.status]?.badge}`}>
                              {STATUS_META[c.status]?.label}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                            {formatKuwaitDateShort(c.created_at)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeNav === 'teams' && (
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">{t.teams}</h1>
                <p className="text-xs text-slate-500 mt-0.5">{teams.length} maintenance teams</p>
              </div>
              <button
                onClick={() => setShowAddTeamModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0088e8] hover:bg-[#0074c7] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team</span>
              </button>
            </div>

            <div className="space-y-4">
              {teamStatsList.map((tm) => {
                const isExpanded = expandedTeamId === tm.id;
                const members = teamMembers.filter((m) => m.team_id === tm.id);
                const draftMember = memberInputs[tm.id] || { name: '', phone: '', role: 'member' };

                return (
                  <div key={tm.id} className={`rounded-2xl border shadow-xs overflow-hidden ${cardBg}`}>
                    <div
                      onClick={() => setExpandedTeamId(isExpanded ? null : tm.id)}
                      className="p-5 cursor-pointer select-none"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-sm">{tm.team_name}</div>
                            <div className="text-xs text-slate-500">{tm.team_leader_name}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              const nextName = window.prompt('Edit team name', tm.team_name);
                              if (nextName === null || !nextName.trim()) return;
                              const nextLeader = window.prompt('Edit team leader name', tm.team_leader_name) ?? tm.team_leader_name;
                              const updated = { ...tm, team_name: nextName.trim(), team_leader_name: nextLeader.trim() || tm.team_leader_name };
                              if (supabaseClient && connectionStatus === 'connected') {
                                const { error } = await supabaseClient.from('teams').update({ team_name: updated.team_name, team_leader_name: updated.team_leader_name }).eq('id', tm.id);
                                if (error) { showToast(error.message, 'error'); return; }
                              }
                              setTeams((prev) => prev.map((item) => item.id === tm.id ? updated : item));
                              showToast('Team details updated', 'success');
                            }}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold border border-sky-200 bg-sky-50 text-sky-700"
                          >Edit</button>
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              const nextActive = !tm.is_active;
                              if (supabaseClient && connectionStatus === 'connected') {
                                const { error } = await supabaseClient.from('teams').update({ is_active: nextActive }).eq('id', tm.id);
                                if (error) { showToast(error.message, 'error'); return; }
                              }
                              setTeams((prev) =>
                                prev.map((item) => (item.id === tm.id ? { ...item, is_active: nextActive } : item))
                              );
                            }}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${
                              tm.is_active
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {tm.is_active ? 'Active' : 'Inactive'}
                          </button>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{tm.team_leader_phone}</span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 text-center">
                        <div>
                          <Wrench className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                          <div className="text-base font-extrabold">{tm.total}</div>
                          <div className="text-[11px] text-slate-400">Total</div>
                        </div>
                        <div>
                          <Clock className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1" />
                          <div className="text-base font-extrabold text-amber-600">{tm.pending}</div>
                          <div className="text-[11px] text-slate-400">Pending</div>
                        </div>
                        <div>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mx-auto mb-1" />
                          <div className="text-base font-extrabold text-emerald-600">{tm.done}</div>
                          <div className="text-[11px] text-slate-400">Done</div>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">Team Members</span>
                          <span className="text-[11px] text-slate-400">{members.length} members</span>
                        </div>

                        <div className="space-y-2">
                          {members.map((m) => (
                            <div
                              key={m.id}
                              className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                                  <Users className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-bold text-xs">{m.member_name}</div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[11px] text-slate-400">{m.phone_number}</span>
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        m.member_role === 'leader'
                                          ? 'bg-sky-100 text-sky-700'
                                          : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {m.member_role}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  setTeamMembers((prev) => prev.filter((item) => item.id !== m.id));
                                  showToast('Member removed', 'info');
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!draftMember.name.trim()) return;
                            setTeamMembers((prev) => [
                              ...prev,
                              {
                                id: `tm-${Date.now()}`,
                                team_id: tm.id,
                                member_name: draftMember.name.trim(),
                                phone_number: draftMember.phone.trim() || '+965 5551 0000',
                                member_role: draftMember.role || 'member'
                              }
                            ]);
                            setMemberInputs((prev) => ({
                              ...prev,
                              [tm.id]: { name: '', phone: '', role: 'member' }
                            }));
                            showToast('Team member added!', 'success');
                          }}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-2"
                        >
                          <input
                            required
                            value={draftMember.name}
                            onChange={(e) =>
                              setMemberInputs((prev) => ({
                                ...prev,
                                [tm.id]: { ...draftMember, name: e.target.value }
                              }))
                            }
                            placeholder="Member name"
                            className="sm:col-span-4 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none"
                          />
                          <input
                            value={draftMember.phone}
                            onChange={(e) =>
                              setMemberInputs((prev) => ({
                                ...prev,
                                [tm.id]: { ...draftMember, phone: e.target.value }
                              }))
                            }
                            placeholder="Phone"
                            className="sm:col-span-3 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none"
                          />
                          <select
                            value={draftMember.role}
                            onChange={(e) =>
                              setMemberInputs((prev) => ({
                                ...prev,
                                [tm.id]: { ...draftMember, role: e.target.value }
                              }))
                            }
                            className="sm:col-span-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold outline-none"
                          >
                            <option value="member">Member</option>
                            <option value="leader">Leader</option>
                          </select>
                          <button
                            type="submit"
                            className="sm:col-span-3 py-2.5 px-4 rounded-xl bg-[#0088e8] hover:bg-[#0074c7] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Add Member</span>
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeNav === 'locations' && (
          <div className="max-w-6xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">{t.locations}</h1>
                <p className="text-xs text-slate-500 mt-0.5">{filteredLocationsList.length} location(s)</p>
              </div>
              <button
                onClick={() => setShowAddLocationModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0088e8] hover:bg-[#0074c7] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Location</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={locSearchQuery}
                  onChange={(e) => setLocSearchQuery(e.target.value)}
                  placeholder="Search by name, company, or area..."
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs outline-none ${cardBg}`}
                />
              </div>

              <select
                value={locAreaFilter}
                onChange={(e) => setLocAreaFilter(e.target.value)}
                className={`px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold outline-none ${cardBg}`}
              >
                <option value="all">All Areas</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.area_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLocationsList.map((loc) => {
                const comp = companies.find((c) => c.id === loc.company_id);
                return (
                  <div
                    key={loc.id}
                    className={`p-5 rounded-2xl border shadow-xs hover:border-sky-300 transition space-y-3 ${cardBg}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs leading-snug">{loc.branch_name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{comp?.company_name}</div>
                      </div>
                      <button onClick={async () => {
                        const branch = window.prompt('Edit location / branch name', loc.branch_name);
                        if (branch === null || !branch.trim()) return;
                        const address = window.prompt('Edit full address', loc.full_address) ?? loc.full_address;
                        const contact = window.prompt('Edit contact person', loc.contact_person || '') ?? loc.contact_person;
                        const phone = window.prompt('Edit contact phone', loc.contact_phone || '') ?? loc.contact_phone;
                        const updated = { ...loc, branch_name: branch.trim(), full_address: address.trim(), contact_person: contact.trim(), contact_phone: phone.trim() };
                        if (supabaseClient && connectionStatus === 'connected') {
                          const { error } = await supabaseClient.from('locations').update({ branch_name: updated.branch_name, full_address: updated.full_address, contact_person: updated.contact_person, contact_phone: updated.contact_phone }).eq('id', loc.id);
                          if (error) { showToast(error.message, 'error'); return; }
                        }
                        setLocations((prev) => prev.map((item) => item.id === loc.id ? updated : item));
                        showToast('Location details updated', 'success');
                      }} className="px-3 py-1.5 rounded-lg text-[11px] font-bold border border-sky-200 bg-sky-50 text-sky-700 shrink-0">Edit</button>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-500 pt-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{loc.full_address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{loc.contact_person || 'Branch Manager'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{loc.contact_phone || '+965 2222 0000'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeNav === 'reports' && (
          <div className="max-w-6xl mx-auto space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">Monthly Reports</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  {new Date(selectedYear, selectedMonth - 1, 1).toLocaleString('en-US', { month: 'long' })} {selectedYear}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className={`px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold ${cardBg}`}
                >
                  {Array.from({ length: 12 }, (_, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {new Date(2026, idx, 1).toLocaleString('en-US', { month: 'long' })}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className={`px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold ${cardBg}`}
                >
                  {[2025, 2026, 2027].map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleExportExcel}
                  className={`px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-xs font-bold flex items-center gap-1.5 shadow-xs transition ${cardBg}`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                  <Wrench className="w-3.5 h-3.5 text-sky-500" />
                  <span>Total</span>
                </div>
                <div className="text-2xl font-extrabold">{monthlyReportData.total}</div>
              </div>

              <div className={`p-4 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Completed</span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-600">{monthlyReportData.completed}</div>
              </div>

              <div className={`p-4 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pending</span>
                </div>
                <div className="text-2xl font-extrabold text-amber-600">{monthlyReportData.pending}</div>
              </div>

              <div className={`p-4 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
                  <span>In Progress</span>
                </div>
                <div className="text-2xl font-extrabold text-purple-600">{monthlyReportData.inProgress}</div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
              <h3 className="text-xs font-bold mb-4">Completion Rate</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeDasharray={`${monthlyReportData.completionRate}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-sm font-extrabold">{monthlyReportData.completionRate}%</span>
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>
                    {monthlyReportData.completed} out of {monthlyReportData.total} complaints resolved
                  </div>
                  <div>{monthlyReportData.total - monthlyReportData.completed} still open</div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
              <h3 className="text-xs font-bold mb-4">Daily Complaints</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyReportData.dailyLine}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="Complaints" stroke="#0284c7" strokeWidth={2} dot={{ r: 2.5 }} />
                    <Line type="monotone" dataKey="Done" stroke="#10b981" strokeWidth={2} dot={{ r: 2.5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <h3 className="text-xs font-bold mb-4">Team Performance</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyReportData.byTeam} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} />
                      <YAxis type="category" dataKey="team_name" tick={{ fontSize: 10 }} width={75} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="Done" stackId="a" fill="#10b981" />
                      <Bar dataKey="In Progress" stackId="a" fill="#8b5cf6" />
                      <Bar dataKey="Pending" stackId="a" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <h3 className="text-xs font-bold mb-4">Complaints by Issue Type</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={
                          monthlyReportData.byIssue.length
                            ? monthlyReportData.byIssue
                            : [{ name: 'No Data', value: 1 }]
                        }
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={72}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {['#0284c7', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899'].map((col, idx) => (
                          <Cell key={idx} fill={col} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
              <h3 className="text-xs font-bold mb-4">Complaints by Area</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReportData.byArea}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="area" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`rounded-2xl border shadow-xs overflow-hidden ${cardBg}`}>
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold">Team Performance Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Team</th>
                      <th className="py-3 px-4">Leader</th>
                      <th className="py-3 px-4 text-center">Total</th>
                      <th className="py-3 px-4 text-center">Done</th>
                      <th className="py-3 px-4 text-center">Pending</th>
                      <th className="py-3 px-4 text-center">In Progress</th>
                      <th className="py-3 px-4">Completion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {monthlyReportData.byTeam.map((row) => (
                      <tr key={row.team_name}>
                        <td className="py-3 px-4">
                          <span
                            className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] font-bold ${
                              row.rank === 1 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {row.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold">{row.team_name}</td>
                        <td className="py-3 px-4 text-slate-500">{row.leader}</td>
                        <td className="py-3 px-4 text-center font-bold">{row.total}</td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-600">{row.Done}</td>
                        <td className="py-3 px-4 text-center font-bold text-amber-600">{row.Pending}</td>
                        <td className="py-3 px-4 text-center font-bold text-purple-600">{row['In Progress']}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: `${row.rate}%` }} />
                            </div>
                            <span className="text-[11px] text-slate-500">{row.rate}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {showNewComplaintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm">Register New AC Complaint</span>
              <button onClick={() => setShowNewComplaintModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onCreateComplaint({
                  location_id: ncLocationId,
                  contact_person: ncContactPerson,
                  contact_phone: ncContactPhone,
                  issue_type: ncIssueType,
                  priority: ncPriority,
                  description: ncDescription
                });
                setShowNewComplaintModal(false);
                setNcContactPerson('');
                setNcContactPhone('');
                setNcDescription('');
              }}
              className="p-6 space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold mb-1">Branch Location</label>
                <select
                  required
                  value={ncLocationId}
                  onChange={(e) => setNcLocationId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.branch_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  value={ncContactPerson}
                  onChange={(e) => setNcContactPerson(e.target.value)}
                  placeholder="Contact Person"
                  className="px-3 py-2 rounded-xl border border-slate-300"
                />
                <input
                  required
                  value={ncContactPhone}
                  onChange={(e) => setNcContactPhone(e.target.value)}
                  placeholder="Phone (+965...)"
                  className="px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={ncIssueType}
                  onChange={(e) => setNcIssueType(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {ISSUE_TYPES.map((it) => (
                    <option key={it} value={it}>
                      {it}
                    </option>
                  ))}
                </select>
                <select
                  value={ncPriority}
                  onChange={(e) => setNcPriority(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <textarea
                required
                rows={3}
                value={ncDescription}
                onChange={(e) => setNcDescription(e.target.value)}
                placeholder="Complaint details..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0088e8] text-white font-bold">
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddTeamModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm">Add Maintenance Team</span>
              <button onClick={() => setShowAddTeamModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newId = `team-${Date.now()}`;
                const rec = {
                  id: newId,
                  team_name: newTeamName,
                  team_leader_name: newTeamLeader,
                  team_leader_phone: newTeamPhone,
                  login_username: newTeamUsername.toLowerCase(),
                  is_active: true
                };
                if (supabaseClient && connectionStatus === 'connected') {
                  await supabaseClient.from('teams').insert(rec);
                }
                setTeams((prev) => [...prev, rec]);
                setTeamMembers((prev) => [
                  ...prev,
                  { id: `tm-${Date.now()}`, team_id: newId, member_name: newTeamLeader, phone_number: newTeamPhone, member_role: 'leader' }
                ]);
                setNewTeamName('');
                setNewTeamLeader('');
                setNewTeamPhone('');
                setNewTeamUsername('');
                setShowAddTeamModal(false);
                showToast('Team created!', 'success');
              }}
              className="p-6 space-y-3 text-xs"
            >
              <input
                required
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Team Name (e.g., Team Echo)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
              <input
                required
                value={newTeamLeader}
                onChange={(e) => setNewTeamLeader(e.target.value)}
                placeholder="Team Leader Name"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
              <input
                required
                value={newTeamPhone}
                onChange={(e) => setNewTeamPhone(e.target.value)}
                placeholder="Leader Phone (+965...)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
              <input
                required
                value={newTeamUsername}
                onChange={(e) => setNewTeamUsername(e.target.value)}
                placeholder="Login Username (team_echo)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0088e8] text-white font-bold">
                Create Team
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm">Add Branch Location</span>
              <button onClick={() => setShowAddLocationModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLocations((prev) => [
                  ...prev,
                  {
                    id: `loc-${Date.now()}`,
                    company_id: newBranchCompanyId,
                    area_id: newBranchAreaId,
                    branch_name: newBranchName,
                    full_address: newBranchAddress,
                    contact_person: newBranchManager,
                    contact_phone: newBranchPhone,
                    is_active: true
                  }
                ]);
                setNewBranchName('');
                setNewBranchAddress('');
                setNewBranchManager('');
                setNewBranchPhone('');
                setShowAddLocationModal(false);
                showToast('Location added!', 'success');
              }}
              className="p-6 space-y-3 text-xs"
            >
              <select
                value={newBranchCompanyId}
                onChange={(e) => setNewBranchCompanyId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company_name}
                  </option>
                ))}
              </select>
              <select
                value={newBranchAreaId}
                onChange={(e) => setNewBranchAreaId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.area_name}
                  </option>
                ))}
              </select>
              <input
                required
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder="Branch Name (e.g., 360 Mall - Al Zahra Branch)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
              <input
                required
                value={newBranchAddress}
                onChange={(e) => setNewBranchAddress(e.target.value)}
                placeholder="Full Address"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={newBranchManager}
                  onChange={(e) => setNewBranchManager(e.target.value)}
                  placeholder="Manager Name"
                  className="px-3 py-2 rounded-xl border border-slate-300"
                />
                <input
                  value={newBranchPhone}
                  onChange={(e) => setNewBranchPhone(e.target.value)}
                  placeholder="Phone (+965...)"
                  className="px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0088e8] text-white font-bold">
                Save Location
              </button>
            </form>
          </div>
        </div>
      )}

      {inspectComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-mono font-bold text-sm text-sky-400">{inspectComplaint.ticket_number}</span>
              <button onClick={() => setInspectComplaintId(null)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-3">
                <h4 className="font-bold text-sky-950">Assign / Reassign Maintenance Team</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={assignTeamId}
                    onChange={(e) => setAssignTeamId(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="">Select Team...</option>
                    {teams
                      .filter((tm) => tm.is_active)
                      .map((tm) => (
                        <option key={tm.id} value={tm.id}>
                          {tm.team_name} ({tm.team_leader_name})
                        </option>
                      ))}
                  </select>
                  <select
                    value={assignPriority}
                    onChange={(e) => setAssignPriority(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority</option>
                  </select>
                </div>
                <input
                  value={assignNotes}
                  onChange={(e) => setAssignNotes(e.target.value)}
                  placeholder="Assignment instructions..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
                <button
                  onClick={() => {
                    onAssignTeam(inspectComplaint.id, assignTeamId, assignNotes, assignPriority);
                    setAssignNotes('');
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold"
                >
                  Confirm Assignment
                </button>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <History className="w-4 h-4" /> Assignment Audit History
                </h4>
                <div className="space-y-2">
                  {assignments
                    .filter((a) => a.complaint_id === inspectComplaint.id)
                    .map((a) => (
                      <div key={a.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                        <span className="font-bold">{teams.find((tm) => tm.id === a.team_id)?.team_name}</span>
                        <span className="text-slate-500">{formatKuwaitDateTime(a.assigned_at)}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-700">Internal Private Notes</h4>
                {notes
                  .filter((n) => n.complaint_id === inspectComplaint.id)
                  .map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                      {n.note}
                    </div>
                  ))}
                <div className="flex gap-2">
                  <input
                    value={adminPrivateNote}
                    onChange={(e) => setAdminPrivateNote(e.target.value)}
                    placeholder="Add internal note..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300"
                  />
                  <button
                    onClick={() => {
                      onAddNote(inspectComplaint.id, adminPrivateNote);
                      setAdminPrivateNote('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 7. CUSTOMER PORTAL VIEW
// ============================================================================
function CustomerPortalView({
  t,
  lang,
  onToggleLang,
  onBackToRoles,
  locations,
  complaints,
  teams,
  supabaseClient,
  connectionStatus,
  onSubmitComplaint
}) {
  const [tab, setTab] = useState('submit');
  const [locationId, setLocationId] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [priority, setPriority] = useState('normal');
  const [description, setDescription] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState(null);

  const [trackQuery, setTrackQuery] = useState('');
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [trackError, setTrackError] = useState('');

  const handleTrack = async (e, explicitNum) => {
    if (e) e.preventDefault();
    const num = (explicitNum || trackQuery).trim().toUpperCase();
    if (!num) return;
    setTrackError('');

    if (supabaseClient && connectionStatus === 'connected') {
      const { data } = await supabaseClient.rpc('track_public_ticket', { p_ticket_number: num });
      if (!data) setTrackError('Ticket not found.');
      else setTrackedTicket(data);
    } else {
      const found = complaints.find((c) => c.ticket_number.toUpperCase() === num);
      if (!found) {
        setTrackedTicket(null);
        setTrackError(`No ticket found for "${num}". Try TKT-2611-0001.`);
      } else {
        setTrackedTicket({
          ticket_number: found.ticket_number,
          status: found.status,
          priority: found.priority,
          issue_type: found.issue_type,
          description: found.description,
          branch_name: locations.find((l) => l.id === found.location_id)?.branch_name || '',
          assigned_team: teams.find((tm) => tm.id === found.assigned_team_id)?.team_name || 'Awaiting Assignment',
          created_at: found.created_at
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <header className="bg-gradient-to-r from-[#1b93df] to-[#1d64d8] text-white px-6 py-4 shadow">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToRoles}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition"
              title={t.backToRoles}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm">{t.brandName}</div>
              <div className="text-[11px] text-white/80">{t.roleCustomer}</div>
            </div>
          </div>

          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 rounded-lg bg-white/15 text-xs font-semibold"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto p-6 space-y-6">
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setTab('submit')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              tab === 'submit' ? 'bg-[#1b93df] text-white shadow' : 'text-slate-600'
            }`}
          >
            Submit New Complaint
          </button>
          <button
            onClick={() => setTab('track')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              tab === 'track' ? 'bg-[#1b93df] text-white shadow' : 'text-slate-600'
            }`}
          >
            Track Ticket Status
          </button>
        </div>

        {tab === 'submit' ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            {generatedTicket && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="text-xs text-emerald-900">
                  Ticket Generated: <strong className="font-mono text-sm">{generatedTicket}</strong>
                </div>
                <button
                  onClick={() => {
                    setTrackQuery(generatedTicket);
                    setTab('track');
                    handleTrack(null, generatedTicket);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  Track Now
                </button>
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const tNum = await onSubmitComplaint({
                  location_id: locationId,
                  contact_person: contactPerson,
                  contact_phone: contactPhone,
                  issue_type: issueType,
                  priority,
                  description
                });
                if (tNum) {
                  setGeneratedTicket(tNum);
                  setContactPerson('');
                  setContactPhone('');
                  setDescription('');
                }
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Branch Location *</label>
                <select
                  required
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="">Choose Branch...</option>
                  {locations
                    .filter((l) => l.is_active)
                    .map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.branch_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Name *</label>
                  <input
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+965..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">AC Issue Type *</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    {ISSUE_TYPES.map((it) => (
                      <option key={it} value={it}>
                        {it}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Problem Description *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the AC issue..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1b93df] hover:bg-[#167ec2] text-white font-bold text-sm shadow"
              >
                Submit AC Complaint
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <form onSubmit={(e) => handleTrack(e)} className="flex gap-2">
              <input
                required
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="Enter Ticket # (e.g., TKT-2611-0001)"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono uppercase"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#1b93df] text-white font-bold">
                Track
              </button>
            </form>

            {trackError && <p className="text-rose-600 font-semibold">{trackError}</p>}

            {trackedTicket && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-base">{trackedTicket.ticket_number}</span>
                  <span className={`px-3 py-1 rounded-full font-bold border ${STATUS_META[trackedTicket.status]?.badge}`}>
                    {STATUS_META[trackedTicket.status]?.label}
                  </span>
                </div>
                <div className="font-bold text-sm">{trackedTicket.branch_name}</div>
                <p className="text-slate-600">{trackedTicket.description}</p>
                <div className="text-slate-500 pt-1">
                  Assigned Team: <strong>{trackedTicket.assigned_team}</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// 8. TEAM LEADER WORKSPACE (My Tasks & Single Task Detail + Timeline)
// ============================================================================
function TeamLeaderWorkspace({
  t,
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  team,
  complaints,
  locations,
  areas,
  companies,
  notes,
  photos,
  onStartProgress,
  onCompleteWork,
  onUploadPhoto,
  onAddNote,
  onLogout
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [unreadIds, setUnreadIds] = useState(() => complaints.filter((c) => c.status === 'assigned').slice(0, 2).map((c) => c.id));
  const [completionNotes, setCompletionNotes] = useState('');
  const [noteInput, setNoteInput] = useState('');

  const selectedJob = useMemo(
    () => complaints.find((c) => c.id === selectedId) || null,
    [complaints, selectedId]
  );

  useEffect(() => {
    const newlyAssigned = complaints.filter((c) => c.status === 'assigned' && c.assigned_at && !unreadIds.includes(c.id));
    if (newlyAssigned.length) setUnreadIds((prev) => Array.from(new Set([...prev, ...newlyAssigned.map((c) => c.id)])));
  }, [complaints]);

  const teamCounts = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === 'pending' || c.status === 'assigned').length;
    const inProgress = complaints.filter((c) => c.status === 'in_progress').length;
    const completed = complaints.filter((c) => c.status === 'completed').length;
    return { total, pending, inProgress, completed };
  }, [complaints]);

  const recentNotifications = useMemo(() => {
    return [...complaints].filter((c) => c.assigned_at || c.status === 'assigned').sort((a, b) => new Date(b.assigned_at || b.created_at) - new Date(a.assigned_at || a.created_at)).slice(0, 8).map((c) => {
      const compName = companies.find((co) => co.id === c.company_id)?.company_name || 'Client';
      const branchName = locations.find((l) => l.id === c.location_id)?.branch_name || 'Branch';
      return {
        id: c.id,
        text: `New task assigned: ${c.ticket_number} - ${c.issue_type} at ${compName} - ${branchName}`,
        date: formatKuwaitDateShort(c.assigned_at || c.created_at)
      };
    });
  }, [complaints, companies, locations]);

  const openJobDetail = (job) => {
    setSelectedId(job.id);
    setCompletionNotes(job.completion_notes || '');
    setUnreadIds((prev) => prev.filter((id) => id !== job.id));
  };

  const shellBg = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900';
  const sidebarBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#f4f6f9] border-slate-200/80';
  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90';

  const timelineSteps = [
    { key: 'pending', stepNum: 1, label: 'Pending' },
    { key: 'assigned', stepNum: 2, label: 'Assigned' },
    { key: 'in_progress', stepNum: 3, label: 'In Progress' },
    { key: 'completed', stepNum: 4, label: 'Completed' }
  ];
  const currentStepIndex = selectedJob
    ? timelineSteps.findIndex((s) => s.key === selectedJob.status)
    : 0;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${shellBg}`}>
      <aside className={`w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r flex flex-col justify-between ${sidebarBg}`}>
        <div>
          <div className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0088e8] flex items-center justify-center text-white shadow-sm">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">{t.brandName}</div>
              <div className="text-[11px] text-slate-500">{team?.team_name || 'Team Alpha'}</div>
            </div>
          </div>

          <nav className="px-3 space-y-1">
            <button
              onClick={() => setSelectedId(null)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                !selectedJob
                  ? darkMode
                    ? 'bg-slate-800 text-white'
                    : 'bg-[#e6ebf1] text-slate-900'
                  : 'text-slate-600 hover:bg-slate-200/50 dark:text-slate-400'
              }`}
            >
              <ClipboardList className="w-4 h-4 opacity-80" />
              <span>My Tasks</span>
            </button>
          </nav>
        </div>

        <div className="p-3 border-t border-slate-200/70 dark:border-slate-800 space-y-1">
          <button
            onClick={onToggleLang}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/50 dark:text-slate-400"
          >
            <Languages className="w-4 h-4" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/50 dark:text-slate-400"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{darkMode ? t.lightMode : t.darkMode}</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50/70 dark:text-slate-400"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
        {!selectedJob ? (
          <div className="max-w-6xl mx-auto space-y-5">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">My Tasks</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {team?.team_name || 'Team Alpha'} - Assigned complaints and tasks
              </p>
            </div>

            <div className={`p-4 rounded-2xl border-l-4 border-l-[#0088e8] shadow-xs flex flex-wrap items-center justify-between gap-3 ${cardBg}`}>
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-sky-50 text-[#0088e8] flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {unreadIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadIds.length}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold">
                    {unreadIds.length} new tasks assigned
                  </div>
                  <div className="text-[11px] text-slate-500">
                    You have {teamCounts.pending} pending tasks to work on
                  </div>
                </div>
              </div>

              <button
                onClick={() => setUnreadIds([])}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{teamCounts.total}</div>
                <div className="text-xs text-slate-500 mt-1">Total Tasks</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{teamCounts.pending}</div>
                <div className="text-xs text-slate-500 mt-1">Pending</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{teamCounts.inProgress}</div>
                <div className="text-xs text-slate-500 mt-1">In Progress</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-xs ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold">{teamCounts.completed}</div>
                <div className="text-xs text-slate-500 mt-1">Completed</div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
              <h3 className="text-sm font-bold">Recent Notifications</h3>
              <div className="space-y-2.5">
                {recentNotifications.length === 0 && <p className="text-xs text-slate-400 py-3">No assignment notifications yet. New tasks will appear here when Admin assigns them to your team.</p>}
                {recentNotifications.map((notif) => {
                  const targetJob = complaints.find((c) => c.id === notif.id);
                  return (
                    <div
                      key={notif.id}
                      className="p-3.5 rounded-xl bg-[#f4f9fd] dark:bg-slate-800/60 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#0088e8] mt-1.5 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-slate-800 dark:text-slate-200">{notif.text}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{notif.date}</div>
                        </div>
                      </div>
                      {targetJob && (
                        <button
                          onClick={() => openJobDetail(targetJob)}
                          className="text-xs font-semibold text-[#0088e8] hover:underline shrink-0"
                        >
                          View
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`rounded-2xl border shadow-xs overflow-hidden ${cardBg}`}>
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold">Assigned Complaints</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400">
                      <th className="py-3 px-4">Ticket</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">Issue</th>
                      <th className="py-3 px-4">Priority</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {complaints.map((job) => {
                      const comp = companies.find((co) => co.id === job.company_id);
                      return (
                        <tr
                          key={job.id}
                          onClick={() => openJobDetail(job)}
                          className="hover:bg-slate-50/90 dark:hover:bg-slate-800/40 cursor-pointer transition"
                        >
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {job.ticket_number}
                          </td>
                          <td className="py-3.5 px-4 font-bold whitespace-nowrap">{comp?.company_name || '—'}</td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">{job.issue_type}</td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${PRIORITY_META[job.priority]?.badge}`}>
                              {PRIORITY_META[job.priority]?.label}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${STATUS_META[job.status]?.badge}`}>
                              {STATUS_META[job.status]?.label}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{formatKuwaitDateShort(job.created_at)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Back to My Tasks"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h1 className="text-xl font-extrabold tracking-tight">{selectedJob.ticket_number}</h1>
                  <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold border ${STATUS_META[selectedJob.status]?.badge}`}>
                    {STATUS_META[selectedJob.status]?.label}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${PRIORITY_META[selectedJob.priority]?.badge}`}>
                    {PRIORITY_META[selectedJob.priority]?.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 pl-9">{selectedJob.issue_type}</p>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border shadow-xs ${cardBg}`}>
              <h3 className="text-xs font-bold mb-6">Status Timeline</h3>
              <div className="grid grid-cols-4 items-center relative">
                {timelineSteps.map((step, idx) => {
                  const isDone = idx < currentStepIndex || selectedJob.status === 'completed';
                  const isCurrent = idx === currentStepIndex && selectedJob.status !== 'completed';
                  return (
                    <div key={step.key} className="flex flex-col items-center relative">
                      {idx < timelineSteps.length - 1 && (
                        <div
                          className={`hidden sm:block absolute top-4 left-1/2 w-full h-0.5 ${
                            idx < currentStepIndex ? 'bg-[#0088e8]' : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        />
                      )}
                      <div
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          isDone
                            ? 'bg-[#0088e8] border-[#0088e8] text-white'
                            : isCurrent
                            ? 'bg-sky-50 border-[#0088e8] text-[#0088e8] ring-4 ring-sky-100'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.stepNum}
                      </div>
                      <span className={`mt-2 text-[11px] font-semibold ${isCurrent || isDone ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className={`lg:col-span-8 p-6 rounded-2xl border shadow-xs space-y-5 ${cardBg}`}>
                <h3 className="text-xs font-bold">Complaint Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400">Company</div>
                      <div className="font-bold mt-0.5">
                        {companies.find((c) => c.id === selectedJob.company_id)?.company_name || '—'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400">Location</div>
                      <div className="font-bold mt-0.5">
                        {locations.find((l) => l.id === selectedJob.location_id)?.branch_name || '—'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {areas.find((a) => a.id === selectedJob.area_id)?.area_name || ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400">Contact Person</div>
                      <div className="font-bold mt-0.5">{selectedJob.contact_person || '—'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400">Contact Phone</div>
                      <div className="font-bold mt-0.5">{selectedJob.contact_phone || '—'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Wrench className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400">Issue Type</div>
                      <div className="font-bold mt-0.5">{selectedJob.issue_type}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400">Created</div>
                      <div className="font-bold mt-0.5">{formatKuwaitDateTime(selectedJob.created_at)}</div>
                    </div>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div className="text-[11px] text-slate-400">Description</div>
                  <div className="font-medium mt-1">{selectedJob.description}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-[11px] text-slate-400">Assigned Team</div>
                    <div className="font-bold mt-1">
                      {team?.team_name}{' '}
                      <span className="font-normal text-slate-400">• {team?.team_leader_name}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Assigned At</div>
                    <div className="font-bold mt-1">{formatKuwaitDateTime(selectedJob.assigned_at)}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="font-bold">Internal Maintenance Notes</div>
                  {notes
                    .filter((n) => n.complaint_id === selectedJob.id)
                    .map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-amber-50 text-amber-950 border border-amber-200">
                        {n.note}
                      </div>
                    ))}
                  <div className="flex gap-2">
                    <input
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="Add internal maintenance note..."
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                    <button
                      onClick={() => {
                        onAddNote(selectedJob.id, noteInput);
                        setNoteInput('');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-4 p-6 rounded-2xl border shadow-xs space-y-4 h-fit ${cardBg}`}>
                <h3 className="text-xs font-bold">Actions</h3>

                {selectedJob.status === 'assigned' && (
                  <button
                    onClick={() => onStartProgress(selectedJob.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0088e8] hover:bg-[#0074c7] text-white text-xs font-bold shadow-xs transition"
                  >
                    Start Work
                  </button>
                )}

                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <div className="text-[11px] text-slate-500 mb-1.5">Before Photo</div>
                    <label className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold flex items-center justify-center gap-2 cursor-pointer transition">
                      <Camera className="w-4 h-4" />
                      <span>Upload Before Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && onUploadPhoto(selectedJob.id, 'before', e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div>
                    <div className="text-[11px] text-slate-500 mb-1.5">After Photo</div>
                    <label className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold flex items-center justify-center gap-2 cursor-pointer transition">
                      <Camera className="w-4 h-4" />
                      <span>Upload After Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && onUploadPhoto(selectedJob.id, 'after', e.target.files[0])}
                      />
                    </label>
                  </div>

                  {photos.filter((p) => p.complaint_id === selectedJob.id).length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {photos
                        .filter((p) => p.complaint_id === selectedJob.id)
                        .map((ph) => (
                          <div key={ph.id} className="space-y-1">
                            <img src={ph.preview_url} alt={ph.photo_type} className="w-full h-20 object-cover rounded-lg border" />
                            <div className="text-[10px] text-slate-400 uppercase font-semibold">{ph.photo_type}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {selectedJob.status !== 'completed' && (
                  <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <textarea
                      rows={3}
                      value={completionNotes}
                      onChange={(e) => setCompletionNotes(e.target.value)}
                      placeholder="Enter completion notes..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                    />
                    <button
                      onClick={() => onCompleteWork(selectedJob.id, completionNotes)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
                    >
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}