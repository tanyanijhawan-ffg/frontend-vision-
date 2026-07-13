import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, User, GraduationCap, Users, Briefcase, HeartPulse, BrainCircuit, Target, MapPin } from 'lucide-react';
import { regions, districts, centres } from '../../data/mockData';

const STEPS = [
  { id: 1, name: 'Identification', icon: User },
  { id: 2, name: 'Education', icon: GraduationCap },
  { id: 3, name: 'Family', icon: Users },
  { id: 4, name: 'Socio-Economic', icon: Briefcase },
  { id: 5, name: 'Vulnerabilities', icon: HeartPulse },
  { id: 6, name: 'Motivation', icon: BrainCircuit },
  { id: 7, name: 'Aspirations', icon: Target },
  { id: 8, name: 'Assignment', icon: MapPin },
];

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm';
const labelCls = 'block text-sm font-medium text-slate-700 mb-1';
const sectionTitle = 'text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-6 first:mt-0';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function Step1() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Student ID (Auto-generated)">
          <input type="text" value="VGE-2024-042" readOnly className={inputCls + ' bg-slate-50 text-slate-500'} />
        </Field>
        <Field label="Full Name *">
          <input type="text" placeholder="Enter full name" className={inputCls} />
        </Field>
        <Field label="Nickname / Call Name">
          <input type="text" placeholder="Nickname" className={inputCls} />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Date of Birth *">
          <input type="date" className={inputCls} />
        </Field>
        <Field label="Gender *">
          <select className={inputCls}>
            <option value="">Select gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Religion">
          <select className={inputCls}>
            <option value="">Select religion</option>
            <option>Hindu</option>
            <option>Muslim</option>
            <option>Christian</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Caste / Community">
          <input type="text" placeholder="e.g. SC, ST, OBC, General" className={inputCls} />
        </Field>
        <Field label="Mother Tongue">
          <select className={inputCls}>
            <option value="">Select language</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Kannada</option>
            <option>Malayalam</option>
            <option>Hindi</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Aadhar Number">
          <input type="text" placeholder="XXXX XXXX XXXX" maxLength={14} className={inputCls} />
        </Field>
        <Field label="Contact Number">
          <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputCls} />
        </Field>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Current Class / Grade *">
          <select className={inputCls}>
            <option value="">Select class</option>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
              <option key={c}>Class {c}</option>
            ))}
            <option>Dropped Out</option>
            <option>Not Enrolled</option>
          </select>
        </Field>
        <Field label="School Name">
          <input type="text" placeholder="School / institution name" className={inputCls} />
        </Field>
        <Field label="School Type">
          <select className={inputCls}>
            <option value="">Select type</option>
            <option>Government</option>
            <option>Government Aided</option>
            <option>Private</option>
            <option>Madrasa</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Medium of Instruction">
          <select className={inputCls}>
            <option value="">Select medium</option>
            <option>Tamil Medium</option>
            <option>English Medium</option>
            <option>Telugu Medium</option>
            <option>Kannada Medium</option>
            <option>Malayalam Medium</option>
          </select>
        </Field>
        <Field label="Attendance Rate at School (%)">
          <input type="number" min={0} max={100} placeholder="e.g. 75" className={inputCls} />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="First Generation Learner?">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </Field>
        <Field label="Special Educational Needs">
          <select className={inputCls}>
            <option value="">None</option>
            <option>Learning Disability</option>
            <option>Visual Impairment</option>
            <option>Hearing Impairment</option>
            <option>Physical Disability</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <Field label="Academic Remarks">
        <textarea rows={2} placeholder="Any notable academic background or challenges..." className={inputCls} />
      </Field>
    </div>
  );
}

function Step3() {
  return (
    <div className="space-y-4">
      <p className={sectionTitle}>Parent / Guardian Details</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Father's Name">
          <input type="text" placeholder="Father's full name" className={inputCls} />
        </Field>
        <Field label="Father's Occupation">
          <input type="text" placeholder="e.g. Daily wage labourer" className={inputCls} />
        </Field>
        <Field label="Father's Education">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Illiterate</option>
            <option>Primary (1–5)</option>
            <option>Middle (6–8)</option>
            <option>Secondary (9–10)</option>
            <option>Higher Secondary</option>
            <option>Graduate</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Mother's Name">
          <input type="text" placeholder="Mother's full name" className={inputCls} />
        </Field>
        <Field label="Mother's Occupation">
          <input type="text" placeholder="e.g. Homemaker, Domestic worker" className={inputCls} />
        </Field>
        <Field label="Mother's Education">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Illiterate</option>
            <option>Primary (1–5)</option>
            <option>Middle (6–8)</option>
            <option>Secondary (9–10)</option>
            <option>Higher Secondary</option>
            <option>Graduate</option>
          </select>
        </Field>
      </div>
      <p className={sectionTitle}>Family Composition</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Family Type">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Nuclear</option>
            <option>Joint / Extended</option>
            <option>Single Parent</option>
            <option>Orphan</option>
            <option>Guardian Care</option>
          </select>
        </Field>
        <Field label="No. of Siblings">
          <input type="number" min={0} max={20} placeholder="0" className={inputCls} />
        </Field>
        <Field label="Birth Order">
          <input type="number" min={1} max={20} placeholder="e.g. 2 (second child)" className={inputCls} />
        </Field>
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Monthly Household Income (₹)">
          <select className={inputCls}>
            <option value="">Select range</option>
            <option>Below ₹3,000</option>
            <option>₹3,000 – ₹6,000</option>
            <option>₹6,000 – ₹10,000</option>
            <option>₹10,000 – ₹20,000</option>
            <option>Above ₹20,000</option>
          </select>
        </Field>
        <Field label="Primary Income Source">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Daily Wage Labour</option>
            <option>Agriculture</option>
            <option>Small Business</option>
            <option>Salaried Employment</option>
            <option>No Regular Income</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Housing Condition">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Permanent (Pucca)</option>
            <option>Semi-permanent (Semi-Pucca)</option>
            <option>Temporary (Kutcha)</option>
            <option>Homeless / Shelter</option>
          </select>
        </Field>
        <Field label="BPL Card Holder?">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not Known</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Access to Electricity">
          <select className={inputCls}>
            <option>Yes</option>
            <option>No</option>
            <option>Partial</option>
          </select>
        </Field>
        <Field label="Access to Clean Water">
          <select className={inputCls}>
            <option>Yes</option>
            <option>No</option>
            <option>Partial</option>
          </select>
        </Field>
        <Field label="Access to Smartphone/Internet">
          <select className={inputCls}>
            <option>Yes</option>
            <option>No</option>
            <option>Shared</option>
          </select>
        </Field>
      </div>
      <Field label="Government Benefits Received">
        <input type="text" placeholder="e.g. Mid-day meal, Scholarship, Amma scheme" className={inputCls} />
      </Field>
    </div>
  );
}

const VULNERABILITIES = [
  'First Generation Learner',
  'Single Parent Family',
  'Migrant Family',
  'Extreme Poverty',
  'Orphan (one parent)',
  'Orphan (both parents)',
  'Child Labour Risk',
  'Early Marriage Risk',
  'Domestic Violence',
  'Substance Abuse in Family',
  'Chronic Illness in Family',
  'Disability',
  'Street Child',
  'Trafficking Risk',
];

function Step5() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (v: string) => setSelected(s => s.includes(v) ? s.filter(x => x !== v) : [...s, v]);

  return (
    <div className="space-y-5">
      <div>
        <p className={sectionTitle}>Select All Applicable Vulnerabilities</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {VULNERABILITIES.map(v => (
            <label key={v} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
              selected.includes(v) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-slate-300 text-slate-700'
            }`}>
              <input
                type="checkbox"
                checked={selected.includes(v)}
                onChange={() => toggle(v)}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-sm font-medium">{v}</span>
            </label>
          ))}
        </div>
      </div>
      <Field label="Risk Assessment Level">
        <select className={inputCls}>
          <option value="">Select level</option>
          <option>Low Risk</option>
          <option>Moderate Risk</option>
          <option>High Risk</option>
          <option>Critical</option>
        </select>
      </Field>
      <Field label="Additional Vulnerability Notes">
        <textarea rows={3} placeholder="Describe any specific circumstances not listed above..." className={inputCls} />
      </Field>
    </div>
  );
}

const MOTIVATIONS = [
  'Wants to study further',
  'Likes learning new things',
  'Inspired by a role model',
  'Family support / encouragement',
  'Peer influence (positive)',
  'Wants to improve family income',
  'Enjoys sports / arts',
  'Participates actively in programme',
];

function Step6() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (v: string) => setSelected(s => s.includes(v) ? s.filter(x => x !== v) : [...s, v]);

  return (
    <div className="space-y-5">
      <div>
        <p className={sectionTitle}>Motivation Indicators</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MOTIVATIONS.map(m => (
            <label key={m} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
              selected.includes(m) ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:border-slate-300 text-slate-700'
            }`}>
              <input
                type="checkbox"
                checked={selected.includes(m)}
                onChange={() => toggle(m)}
                className="w-4 h-4 accent-emerald-600"
              />
              <span className="text-sm font-medium">{m}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Motivation Score (Facilitator Assessment)">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>1 – Very Low</option>
            <option>2 – Low</option>
            <option>3 – Moderate</option>
            <option>4 – High</option>
            <option>5 – Very High</option>
          </select>
        </Field>
        <Field label="Key Strengths Observed">
          <input type="text" placeholder="e.g. Punctual, Curious, Good listener" className={inputCls} />
        </Field>
      </div>
      <Field label="Facilitator Observation Notes">
        <textarea rows={3} placeholder="Describe the student's attitude, energy, engagement in the programme..." className={inputCls} />
      </Field>
    </div>
  );
}

function Step7() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Short-Term Goal (1–2 years)">
          <input type="text" placeholder="e.g. Pass Class 10 with good marks" className={inputCls} />
        </Field>
        <Field label="Long-Term Goal (5–10 years)">
          <input type="text" placeholder="e.g. Become a teacher" className={inputCls} />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Career Aspiration">
          <select className={inputCls}>
            <option value="">Select field</option>
            <option>Education / Teaching</option>
            <option>Healthcare / Nursing</option>
            <option>Government / Civil Services</option>
            <option>Engineering / Technology</option>
            <option>Arts / Music / Sports</option>
            <option>Business / Entrepreneur</option>
            <option>Agriculture</option>
            <option>Not Yet Decided</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Higher Education Interest">
          <select className={inputCls}>
            <option value="">Select</option>
            <option>Strongly Interested</option>
            <option>Interested</option>
            <option>Undecided</option>
            <option>Not Interested</option>
          </select>
        </Field>
      </div>
      <Field label="Skills / Hobbies / Talents">
        <input type="text" placeholder="e.g. Drawing, Cricket, Singing, Computer" className={inputCls} />
      </Field>
      <Field label="Student's Own Words (What do you want to become?)">
        <textarea rows={3} placeholder="Record the student's own statement about their future..." className={inputCls} />
      </Field>
    </div>
  );
}

function Step8() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const filteredDistricts = districts.filter(d => !selectedRegion || d.region === regions.find(r => r.id === selectedRegion)?.name);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const filteredCentres = centres.filter(c => !selectedDistrict || c.district === districts.find(d => d.id === selectedDistrict)?.name);

  return (
    <div className="space-y-4">
      <p className={sectionTitle}>Assign to Region & Centre</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Region *">
          <select className={inputCls} value={selectedRegion} onChange={e => { setSelectedRegion(e.target.value); setSelectedDistrict(''); }}>
            <option value="">Select region</option>
            {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </Field>
        <Field label="District *">
          <select className={inputCls} value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
            <option value="">Select district</option>
            {filteredDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="Centre *">
          <select className={inputCls}>
            <option value="">Select centre</option>
            {filteredCentres.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Facilitator Assigned">
          <input type="text" placeholder="Facilitator name" className={inputCls} />
        </Field>
        <Field label="Date of Enrolment *">
          <input type="date" className={inputCls} defaultValue={new Date().toISOString().split('T')[0]} />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Programme Track">
          <select className={inputCls}>
            <option value="">Select track</option>
            <option>Academic Support</option>
            <option>Life Skills</option>
            <option>Leadership</option>
            <option>Vocational Training</option>
            <option>All Tracks</option>
          </select>
        </Field>
        <Field label="Session Timing">
          <select className={inputCls}>
            <option value="">Select timing</option>
            <option>Morning (7–9 AM)</option>
            <option>Afternoon (3–5 PM)</option>
            <option>Evening (5–7 PM)</option>
            <option>Weekend</option>
          </select>
        </Field>
      </div>
      <Field label="Additional Enrolment Notes">
        <textarea rows={2} placeholder="Any special arrangements, notes for the facilitator..." className={inputCls} />
      </Field>

      {/* Summary box */}
      <div className="mt-2 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm font-semibold text-indigo-700 mb-1">✓ Ready to submit</p>
        <p className="text-xs text-indigo-600">Review all steps before submitting. The student record will be created and a unique ID will be assigned.</p>
      </div>
    </div>
  );
}

const STEP_CONTENT: Record<number, React.ReactNode> = {
  1: <Step1 />,
  2: <Step2 />,
  3: <Step3 />,
  4: <Step4 />,
  5: <Step5 />,
  6: <Step6 />,
  7: <Step7 />,
  8: <Step8 />,
};

export default function StudentRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 8) setCurrentStep(c => c + 1);
    else navigate('/students');
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/students')}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Registration</h1>
          <p className="text-sm text-slate-500 mt-0.5">Enroll a new student into the LEP system.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">

        {/* Sidebar Step Indicator */}
        <div className="bg-slate-50 w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-200 p-5 shrink-0">
          <ul className="space-y-1">
            {STEPS.map((step, idx) => {
              const isPast = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const Icon = step.icon;
              return (
                <li key={step.id} className="relative">
                  {idx !== STEPS.length - 1 && (
                    <div className={`absolute left-[18px] top-9 w-px h-3 ${isPast ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                  )}
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                      isCurrent ? 'bg-indigo-600 text-white' :
                      isPast ? 'text-slate-700 hover:bg-slate-100' :
                      'text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isCurrent ? 'bg-white/20' :
                      isPast ? 'bg-indigo-100 text-indigo-600' :
                      'bg-slate-200 text-slate-400'
                    }`}>
                      {isPast ? <Check size={12} strokeWidth={3} className="text-indigo-600" /> : <Icon size={12} />}
                    </div>
                    <span className="text-xs font-medium">{step.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col min-h-[560px]">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {STEPS.find(s => s.id === currentStep)?.name} Details
              </h2>
              <span className="text-xs font-medium text-slate-400">Step {currentStep} of 8</span>
            </div>
            {STEP_CONTENT[currentStep]}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-sm'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
            >
              {currentStep === 8 ? 'Submit Registration' : 'Next Step →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
