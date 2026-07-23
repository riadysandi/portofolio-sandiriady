import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, User, Wrench, Briefcase, GraduationCap, Building2,
  FolderOpen, MessageSquare, Save, LogOut, ArrowLeft, Plus, Trash2,
  ChevronRight, Check, AlertCircle, Menu, X, Loader2, Users, Activity, Globe, MousePointerClick
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { fetchAnalytics, AnalyticsData } from '../lib/analytics';

// ─── Types ───────────────────────────────────────────────────
interface PersonalInfo {
  name: string; title: string;
  contacts: { whatsapp: string; email: string; instagram: string; twitter: string; facebook: string };
  aboutMe: { en: string; id: string };
}
interface SkillItem { name: string; category: string; level: number }
interface ExpItem { id: string; period: string; title: { en: string; id: string }; company: string; points: { en: string[]; id: string[] } }
interface EduItem { id: string; period: string; field: { en: string; id: string }; institution: string }
interface OrgItem { id: string; period: string; role: { en: string; id: string }; organization: string }
interface ProjItem { id: string; title: { en: string; id: string }; description: { en: string; id: string }; tags: string[]; icon: string }
interface LiveSiteItem { id: string; name: string; url: string; description: { en: string; id: string }; status: 'active' | 'maintenance' | 'development' }
interface ContactMsg { id: string; name: string; email: string; message: string; created_at: string }

type TabKey = 'overview' | 'personal' | 'skills' | 'experience' | 'education' | 'organizations' | 'projects' | 'liveSites' | 'messages';

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'personal', label: 'Personal Info', icon: User },
  { key: 'skills', label: 'Skills', icon: Wrench },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'organizations', label: 'Organizations', icon: Building2 },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'liveSites', label: 'Live Sites', icon: Globe },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
];

const CATEGORIES = ['core', 'automation', 'infra', 'tools'];

// ─── Reusable UI ─────────────────────────────────────────────
function Input({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
        className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-slate-600" />
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon className="h-5 w-5 text-emerald-400" />
        <span className="text-2xl font-black text-slate-100">{value}</span>
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function AdminDashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [experiences, setExperiences] = useState<ExpItem[]>([]);
  const [education, setEducation] = useState<EduItem[]>([]);
  const [organizations, setOrganizations] = useState<OrgItem[]>([]);
  const [projects, setProjects] = useState<ProjItem[]>([]);
  const [liveProjects, setLiveProjects] = useState<LiveSiteItem[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [personality, setPersonality] = useState<{ en: string[]; id: string[] }>({ en: [], id: [] });
  const [hobbies, setHobbies] = useState<{ en: { name: string; icon: string }[]; id: { name: string; icon: string }[] }>({ en: [], id: [] });
  const [languages, setLanguages] = useState<{ en: { name: string; level: string }[]; id: { name: string; level: string }[] }>({ en: [], id: [] });
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  // UI states
  const [dataLoading, setDataLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) { window.location.hash = '#/login'; }
  }, [user, authLoading]);

  // Show toast
  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    setDataLoading(true);
    const [siteRes, msgRes, analyticsData] = await Promise.all([
      supabase.from('site_data').select('*').eq('id', 'main').single(),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      fetchAnalytics()
    ]);
    if (siteRes.data) {
      const d = siteRes.data;
      setPersonalInfo(d.personal_info as PersonalInfo);
      setSkills(d.skills as SkillItem[]);
      setExperiences(d.experiences as ExpItem[]);
      setEducation(d.education as EduItem[]);
      setOrganizations(d.organizations as OrgItem[]);
      setProjects(d.projects as ProjItem[]);
      setLiveProjects(d.live_projects || []);
      setPersonality(d.personality as { en: string[]; id: string[] });
      setHobbies(d.hobbies as { en: { name: string; icon: string }[]; id: { name: string; icon: string }[] });
      setLanguages(d.languages as { en: { name: string; level: string }[]; id: { name: string; level: string }[] });
    }
    if (msgRes.data) setMessages(msgRes.data as ContactMsg[]);
    setAnalytics(analyticsData);
    setDataLoading(false);
    setHasChanges(false);
  }, []);

  useEffect(() => { if (user) fetchData(); }, [user, fetchData]);

  // Mark changes
  const markChanged = () => setHasChanges(true);

  // Save to Supabase
  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_data').update({
      personal_info: personalInfo,
      skills,
      experiences,
      education,
      organizations,
      projects,
      live_projects: liveProjects,
      personality,
      hobbies,
      languages,
      updated_at: new Date().toISOString(),
    }).eq('id', 'main');

    if (error) {
      showToast('error', `Gagal menyimpan: ${error.message}`);
    } else {
      showToast('success', 'Data berhasil disimpan!');
      setHasChanges(false);
    }
    setSaving(false);
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (!error) {
      setMessages(prev => prev.filter(m => m.id !== id));
      showToast('success', 'Pesan dihapus');
    }
  };

  // ── Tab Renderers ────────────────────────────────────────────
  const renderOverview = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-slate-100 mb-6 flex items-center gap-2"><LayoutDashboard className="h-5 w-5 text-emerald-500" /> Portfolio Content</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Skills" value={skills.length} icon={Wrench} />
          <StatCard label="Experience" value={experiences.length} icon={Briefcase} />
          <StatCard label="Projects" value={projects.length} icon={FolderOpen} />
          <StatCard label="Messages" value={messages.length} icon={MessageSquare} />
        </div>
      </div>

      {analytics && (
        <div>
          <h2 className="text-xl font-black text-slate-100 mb-6 flex items-center gap-2"><Activity className="h-5 w-5 text-emerald-500" /> Web Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Views" value={analytics.totalViews} icon={Globe} />
            <StatCard label="Unique Visitors" value={analytics.uniqueVisitors} icon={Users} />
            <StatCard label="Views Today" value={analytics.viewsToday} icon={Activity} />
            <StatCard label="Views This Month" value={analytics.viewsThisMonth} icon={MousePointerClick} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Referrers */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">Top Sources (Referrers)</h3>
              {analytics.topReferrers.length === 0 ? (
                <p className="text-slate-500 text-sm">No referrer data yet.</p>
              ) : (
                <div className="space-y-3">
                  {analytics.topReferrers.map((ref, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                      <span className="text-sm text-slate-300 font-medium truncate pr-4">{ref.referrer}</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{ref.count} views</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">Recent Visits</h3>
              {analytics.recentVisitors.length === 0 ? (
                <p className="text-slate-500 text-sm">No recent visits.</p>
              ) : (
                <div className="space-y-3">
                  {analytics.recentVisitors.slice(0, 5).map((visit, idx) => (
                    <div key={idx} className="flex flex-col bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-300 font-mono truncate max-w-[150px]">{visit.visitor_id}</span>
                        <span className="text-[10px] text-slate-500">{new Date(visit.created_at).toLocaleString('id-ID')}</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-medium truncate">{visit.path}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderLiveSites = () => {
    const addSite = () => { setLiveProjects(prev => [...prev, { id: `site${Date.now()}`, name: '', url: '', description: { en: '', id: '' }, status: 'active' }]); markChanged(); };
    const updateSite = (i: number, fn: (s: LiveSiteItem) => LiveSiteItem) => { setLiveProjects(prev => prev.map((s, idx) => idx === i ? fn(s) : s)); markChanged(); };
    const removeSite = (i: number) => { setLiveProjects(prev => prev.filter((_, idx) => idx !== i)); markChanged(); };
    
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-100">Live Web Projects ({liveProjects.length})</h2>
          <button onClick={addSite} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Tambah
          </button>
        </div>
        <div className="space-y-4">
          {liveProjects.map((site, i) => (
            <div key={site.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-emerald-400">{site.name || 'New Live Site'}</h3>
                <button onClick={() => removeSite(i)} className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input label="Name" value={site.name} onChange={v => updateSite(i, s => ({ ...s, name: v }))} />
                <Input label="URL" value={site.url} onChange={v => updateSite(i, s => ({ ...s, url: v }))} placeholder="https://..." />
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
                  <select value={site.status} onChange={e => updateSite(i, s => ({ ...s, status: e.target.value as any }))}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer">
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="development">Development</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextArea label="Description (EN)" value={site.description.en} onChange={v => updateSite(i, s => ({ ...s, description: { ...s.description, en: v } }))} />
                <TextArea label="Description (ID)" value={site.description.id} onChange={v => updateSite(i, s => ({ ...s, description: { ...s.description, id: v } }))} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPersonalInfo = () => {
    if (!personalInfo) return null;
    const update = (fn: (p: PersonalInfo) => PersonalInfo) => { setPersonalInfo(prev => prev ? fn(prev) : prev); markChanged(); };
    return (
      <div>
        <h2 className="text-xl font-black text-slate-100 mb-6">Personal Info</h2>
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Basic</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Name" value={personalInfo.name} onChange={v => update(p => ({ ...p, name: v }))} />
              <Input label="Title" value={personalInfo.title} onChange={v => update(p => ({ ...p, title: v }))} />
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="WhatsApp" value={personalInfo.contacts.whatsapp} onChange={v => update(p => ({ ...p, contacts: { ...p.contacts, whatsapp: v } }))} />
              <Input label="Email" value={personalInfo.contacts.email} onChange={v => update(p => ({ ...p, contacts: { ...p.contacts, email: v } }))} />
              <Input label="Instagram" value={personalInfo.contacts.instagram} onChange={v => update(p => ({ ...p, contacts: { ...p.contacts, instagram: v } }))} />
              <Input label="Twitter" value={personalInfo.contacts.twitter} onChange={v => update(p => ({ ...p, contacts: { ...p.contacts, twitter: v } }))} />
              <Input label="Facebook" value={personalInfo.contacts.facebook} onChange={v => update(p => ({ ...p, contacts: { ...p.contacts, facebook: v } }))} />
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">About Me</h3>
            <TextArea label="English" value={personalInfo.aboutMe.en} onChange={v => update(p => ({ ...p, aboutMe: { ...p.aboutMe, en: v } }))} rows={4} />
            <TextArea label="Bahasa Indonesia" value={personalInfo.aboutMe.id} onChange={v => update(p => ({ ...p, aboutMe: { ...p.aboutMe, id: v } }))} rows={4} />
          </div>
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    const addSkill = () => { setSkills(prev => [...prev, { name: '', category: 'core', level: 3 }]); markChanged(); };
    const updateSkill = (i: number, fn: (s: SkillItem) => SkillItem) => { setSkills(prev => prev.map((s, idx) => idx === i ? fn(s) : s)); markChanged(); };
    const removeSkill = (i: number) => { setSkills(prev => prev.filter((_, idx) => idx !== i)); markChanged(); };
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-100">Skills ({skills.length})</h2>
          <button onClick={addSkill} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Tambah Skill
          </button>
        </div>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <Input label="Name" value={skill.name} onChange={v => updateSkill(i, s => ({ ...s, name: v }))} />
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
                  <select value={skill.category} onChange={e => { updateSkill(i, s => ({ ...s, category: e.target.value })); }}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Level ({skill.level}/5)</label>
                  <input type="range" min={1} max={5} value={skill.level} onChange={e => updateSkill(i, s => ({ ...s, level: +e.target.value }))}
                    className="w-full accent-emerald-500" />
                </div>
                <button onClick={() => removeSkill(i)} className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer">
                  <Trash2 className="h-3.5 w-3.5" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExperience = () => {
    const addExp = () => { setExperiences(prev => [...prev, { id: `exp${Date.now()}`, period: '', title: { en: '', id: '' }, company: '', points: { en: [''], id: [''] } }]); markChanged(); };
    const updateExp = (i: number, fn: (e: ExpItem) => ExpItem) => { setExperiences(prev => prev.map((e, idx) => idx === i ? fn(e) : e)); markChanged(); };
    const removeExp = (i: number) => { setExperiences(prev => prev.filter((_, idx) => idx !== i)); markChanged(); };
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-100">Experience ({experiences.length})</h2>
          <button onClick={addExp} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Tambah
          </button>
        </div>
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div key={exp.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-emerald-400">{exp.title.en || 'New Experience'}</h3>
                <button onClick={() => removeExp(i)} className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Period" value={exp.period} onChange={v => updateExp(i, e => ({ ...e, period: v }))} placeholder="2024 - PRESENT" />
                <Input label="Company" value={exp.company} onChange={v => updateExp(i, e => ({ ...e, company: v }))} />
                <Input label="Title (EN)" value={exp.title.en} onChange={v => updateExp(i, e => ({ ...e, title: { ...e.title, en: v } }))} />
                <Input label="Title (ID)" value={exp.title.id} onChange={v => updateExp(i, e => ({ ...e, title: { ...e.title, id: v } }))} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Points (EN)</label>
                    <button onClick={() => updateExp(i, e => ({ ...e, points: { ...e.points, en: [...e.points.en, ''] } }))}
                      className="text-emerald-400 hover:text-emerald-300 cursor-pointer"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  {exp.points.en.map((pt, pi) => (
                    <div key={pi} className="flex gap-2 mb-2">
                      <input value={pt} onChange={e => { const pts = [...exp.points.en]; pts[pi] = e.target.value; updateExp(i, ex => ({ ...ex, points: { ...ex.points, en: pts } })); }}
                        className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500" />
                      <button onClick={() => { const pts = exp.points.en.filter((_, idx) => idx !== pi); updateExp(i, ex => ({ ...ex, points: { ...ex.points, en: pts } })); }}
                        className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Points (ID)</label>
                    <button onClick={() => updateExp(i, e => ({ ...e, points: { ...e.points, id: [...e.points.id, ''] } }))}
                      className="text-emerald-400 hover:text-emerald-300 cursor-pointer"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  {exp.points.id.map((pt, pi) => (
                    <div key={pi} className="flex gap-2 mb-2">
                      <input value={pt} onChange={e => { const pts = [...exp.points.id]; pts[pi] = e.target.value; updateExp(i, ex => ({ ...ex, points: { ...ex.points, id: pts } })); }}
                        className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500" />
                      <button onClick={() => { const pts = exp.points.id.filter((_, idx) => idx !== pi); updateExp(i, ex => ({ ...ex, points: { ...ex.points, id: pts } })); }}
                        className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    const addEdu = () => { setEducation(prev => [...prev, { id: `edu${Date.now()}`, period: '', field: { en: '', id: '' }, institution: '' }]); markChanged(); };
    const updateEdu = (i: number, fn: (e: EduItem) => EduItem) => { setEducation(prev => prev.map((e, idx) => idx === i ? fn(e) : e)); markChanged(); };
    const removeEdu = (i: number) => { setEducation(prev => prev.filter((_, idx) => idx !== i)); markChanged(); };
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-100">Education ({education.length})</h2>
          <button onClick={addEdu} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Tambah
          </button>
        </div>
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div key={edu.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-bold text-emerald-400">{edu.institution || 'New Education'}</h3>
                <button onClick={() => removeEdu(i)} className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Period" value={edu.period} onChange={v => updateEdu(i, e => ({ ...e, period: v }))} />
                <Input label="Institution" value={edu.institution} onChange={v => updateEdu(i, e => ({ ...e, institution: v }))} />
                <Input label="Field (EN)" value={edu.field.en} onChange={v => updateEdu(i, e => ({ ...e, field: { ...e.field, en: v } }))} />
                <Input label="Field (ID)" value={edu.field.id} onChange={v => updateEdu(i, e => ({ ...e, field: { ...e.field, id: v } }))} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOrganizations = () => {
    const addOrg = () => { setOrganizations(prev => [...prev, { id: `org${Date.now()}`, period: '', role: { en: '', id: '' }, organization: '' }]); markChanged(); };
    const updateOrg = (i: number, fn: (o: OrgItem) => OrgItem) => { setOrganizations(prev => prev.map((o, idx) => idx === i ? fn(o) : o)); markChanged(); };
    const removeOrg = (i: number) => { setOrganizations(prev => prev.filter((_, idx) => idx !== i)); markChanged(); };
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-100">Organizations ({organizations.length})</h2>
          <button onClick={addOrg} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Tambah
          </button>
        </div>
        <div className="space-y-3">
          {organizations.map((org, i) => (
            <div key={org.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-bold text-emerald-400">{org.organization || 'New Organization'}</h3>
                <button onClick={() => removeOrg(i)} className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Period" value={org.period} onChange={v => updateOrg(i, o => ({ ...o, period: v }))} />
                <Input label="Organization" value={org.organization} onChange={v => updateOrg(i, o => ({ ...o, organization: v }))} />
                <Input label="Role (EN)" value={org.role.en} onChange={v => updateOrg(i, o => ({ ...o, role: { ...o.role, en: v } }))} />
                <Input label="Role (ID)" value={org.role.id} onChange={v => updateOrg(i, o => ({ ...o, role: { ...o.role, id: v } }))} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    const addProj = () => { setProjects(prev => [...prev, { id: `proj${Date.now()}`, title: { en: '', id: '' }, description: { en: '', id: '' }, tags: [], icon: 'Cpu' }]); markChanged(); };
    const updateProj = (i: number, fn: (p: ProjItem) => ProjItem) => { setProjects(prev => prev.map((p, idx) => idx === i ? fn(p) : p)); markChanged(); };
    const removeProj = (i: number) => { setProjects(prev => prev.filter((_, idx) => idx !== i)); markChanged(); };
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-100">Projects ({projects.length})</h2>
          <button onClick={addProj} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Tambah
          </button>
        </div>
        <div className="space-y-4">
          {projects.map((proj, i) => (
            <div key={proj.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-emerald-400">{proj.title.en || 'New Project'}</h3>
                <button onClick={() => removeProj(i)} className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Title (EN)" value={proj.title.en} onChange={v => updateProj(i, p => ({ ...p, title: { ...p.title, en: v } }))} />
                <Input label="Title (ID)" value={proj.title.id} onChange={v => updateProj(i, p => ({ ...p, title: { ...p.title, id: v } }))} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextArea label="Description (EN)" value={proj.description.en} onChange={v => updateProj(i, p => ({ ...p, description: { ...p.description, en: v } }))} />
                <TextArea label="Description (ID)" value={proj.description.id} onChange={v => updateProj(i, p => ({ ...p, description: { ...p.description, id: v } }))} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Tags (pisahkan dgn koma)" value={proj.tags.join(', ')} onChange={v => updateProj(i, p => ({ ...p, tags: v.split(',').map(t => t.trim()).filter(Boolean) }))} />
                <Input label="Icon (lucide name)" value={proj.icon} onChange={v => updateProj(i, p => ({ ...p, icon: v }))} placeholder="Cpu, Database, Mail..." />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMessages = () => (
    <div>
      <h2 className="text-xl font-black text-slate-100 mb-6">Messages ({messages.length})</h2>
      {messages.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center">
          <MessageSquare className="h-10 w-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Belum ada pesan masuk</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-sm text-slate-200">{msg.name}</span>
                  <span className="text-slate-500 text-xs ml-2">{msg.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600">{new Date(msg.created_at).toLocaleString('id-ID')}</span>
                  <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'personal': return renderPersonalInfo();
      case 'skills': return renderSkills();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'organizations': return renderOrganizations();
      case 'projects': return renderProjects();
      case 'liveSites': return renderLiveSites();
      case 'messages': return renderMessages();
    }
  };

  // Loading screen
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Mobile menu button */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-800 border border-slate-700 p-2 rounded-lg text-slate-300 cursor-pointer">
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <h1 className="font-black text-lg text-slate-100 tracking-tight">Admin Panel</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Portofolio SandiRiady</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${activeTab === tab.key
                  ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}>
              <tab.icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
              {activeTab === tab.key && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button onClick={() => { window.location.hash = ''; }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Portfolio
          </button>
          <button onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer">
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
          {user && <p className="text-[10px] text-slate-600 truncate px-3">{user.email}</p>}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="md:hidden fixed inset-0 bg-black/50 z-30" />}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {renderTabContent()}
      </main>

      {/* Floating Save Button */}
      {hasChanges && activeTab !== 'messages' && activeTab !== 'overview' && (
        <button onClick={handleSave} disabled={saving}
          className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-2xl shadow-emerald-500/30 flex items-center gap-2 transition-all cursor-pointer z-50 animate-bounce">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-bold transition-all ${
          toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {toast.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
