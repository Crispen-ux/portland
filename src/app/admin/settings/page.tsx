"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card, PageHeader, Button, Input, Badge,
} from "@/components/ui";
import {
  Save, Building2, Palette, Mail, FileText, Settings2,
  Upload, X, CheckCircle, AlertCircle, Loader2,
  CreditCard, GraduationCap, Shield, Bell, Trash2, Image,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────

interface SchoolSettings {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;
  accentColor: string;
  secondaryColor: string;
  fontFamily: string;
  invoicePrefix: string;
  invoiceNotes: string | null;
  invoiceTerms: string | null;
  currency: string;
  currencySymbol: string;
  emailSignature: string | null;
  emailFooter: string | null;
  principalName: string | null;
  principalTitle: string | null;
}

type Tab = "general" | "branding" | "email" | "invoices" | "reports" | "system";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "general", label: "General", icon: Building2 },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "email", label: "Email Templates", icon: Mail },
  { id: "invoices", label: "Invoice Templates", icon: CreditCard },
  { id: "reports", label: "Report Cards", icon: GraduationCap },
  { id: "system", label: "System", icon: Settings2 },
];

const FONTS = [
  { value: "Inter, system-ui, sans-serif", label: "Inter" },
  { value: "'Segoe UI', system-ui, sans-serif", label: "Segoe UI" },
  { value: "Georgia, 'Times New Roman', serif", label: "Georgia" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
  { value: "Verdana, Geneva, sans-serif", label: "Verdana" },
];

const COLORS = [
  { value: "#C41E3A", label: "Portland Red" },
  { value: "#1E40AF", label: "Blue" },
  { value: "#059669", label: "Green" },
  { value: "#7C3AED", label: "Purple" },
  { value: "#D97706", label: "Amber" },
  { value: "#0891B2", label: "Cyan" },
  { value: "#1A1A1A", label: "Dark" },
  { value: "#6B7280", label: "Gray" },
];

// ─── Page ───────────────────────────────────────────────

export default function SettingsPage() {
  const [settings, setSettings] = useState<SchoolSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      } else {
        setError("Failed to load settings");
      }
    } catch {
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess("Settings saved successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (e: any) {
      setError(e.message || "Failed to save settings");
      setTimeout(() => setError(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Logo must be under 2MB");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setUploadingLogo(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUri = reader.result as string;
        const res = await fetch("/api/settings/logo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ logo: dataUri }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }
        const { logoUrl } = await res.json();
        setSettings((s) => (s ? { ...s, logoUrl } : s));
        setSuccess("Logo uploaded successfully");
        setTimeout(() => setSuccess(""), 3000);
        setUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    } catch (e: any) {
      setError(e.message || "Failed to upload logo");
      setTimeout(() => setError(""), 3000);
      setUploadingLogo(false);
    }
    e.target.value = "";
  };

  const handleRemoveLogo = async () => {
    try {
      await fetch("/api/settings/logo", { method: "DELETE" });
      setSettings((s) => (s ? { ...s, logoUrl: null } : s));
      setSuccess("Logo removed");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to remove logo");
      setTimeout(() => setError(""), 3000);
    }
  };

  const updateField = (field: keyof SchoolSettings, value: string) => {
    setSettings((s) => (s ? { ...s, [field]: value } : s));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 text-portland-red animate-spin" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
        <p className="text-portland-gray">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage school information, branding, and document templates."
        action={
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        }
      />

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-portland-light rounded-xl p-1 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-portland-dark shadow-sm"
                  : "text-portland-gray hover:text-portland-dark"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── General Tab ───────────────────────────────── */}
      {activeTab === "general" && (
        <Card>
          <div className="p-5 border-b border-portland-mid/30">
            <h2 className="text-lg font-semibold text-portland-dark">School Information</h2>
            <p className="text-sm text-portland-gray mt-1">Basic information about your school.</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="School Name" value={settings.name} onChange={(e) => updateField("name", e.target.value)} required />
              <Input label="Phone" value={settings.phone || ""} onChange={(e) => updateField("phone", e.target.value)} placeholder="+27" />
              <Input label="Email" type="email" value={settings.email || ""} onChange={(e) => updateField("email", e.target.value)} placeholder="info@portlandschools.co.za" />
              <Input label="Website" value={settings.website || ""} onChange={(e) => updateField("website", e.target.value)} placeholder="https://www.portlandschools.co.za" />
            </div>
            <Input label="Street Address" value={settings.address || ""} onChange={(e) => updateField("address", e.target.value)} />
            <Input label="City" value={settings.city || ""} onChange={(e) => updateField("city", e.target.value)} placeholder="Johannesburg" />
          </div>
        </Card>
      )}

      {/* ── Branding Tab ──────────────────────────────── */}
      {activeTab === "branding" && (
        <div className="space-y-6">
          {/* Logo */}
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <h2 className="text-lg font-semibold text-portland-dark">School Logo</h2>
              <p className="text-sm text-portland-gray mt-1">Upload your school logo. Used on documents, invoices, and email headers.</p>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-6">
                {/* Logo Preview */}
                <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-portland-mid/40 flex items-center justify-center bg-portland-light/50 overflow-hidden shrink-0">
                  {settings.logoUrl ? (
                    <div className="relative w-full h-full group">
                      <img src={settings.logoUrl} alt="School Logo" className="w-full h-full object-contain p-2" />
                      <button
                        onClick={handleRemoveLogo}
                        className="absolute top-1 right-1 p-1 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="w-8 h-8 text-portland-gray/40 mx-auto mb-2" />
                      <p className="text-xs text-portland-gray/60">No logo</p>
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingLogo}
                  >
                    {uploadingLogo ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                    {uploadingLogo ? "Uploading..." : settings.logoUrl ? "Replace Logo" : "Upload Logo"}
                  </Button>
                  <p className="text-xs text-portland-gray mt-2">PNG, JPG or SVG. Max 2MB. Recommended: 400x400px</p>
                  {settings.logoUrl && (
                    <Button variant="ghost" size="sm" onClick={handleRemoveLogo} className="mt-2 text-red-500 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      Remove Logo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Colors & Typography */}
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <h2 className="text-lg font-semibold text-portland-dark">Colors & Typography</h2>
              <p className="text-sm text-portland-gray mt-1">Customize the look and feel of documents and emails.</p>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-portland-dark mb-2">Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => updateField("accentColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-portland-mid/30 cursor-pointer"
                    />
                    <div className="flex gap-2 flex-wrap">
                      {COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => updateField("accentColor", c.value)}
                          className={`w-7 h-7 rounded-lg border-2 transition-all ${
                            settings.accentColor === c.value ? "border-portland-dark scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-portland-dark mb-2">Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => updateField("secondaryColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-portland-mid/30 cursor-pointer"
                    />
                    <div className="flex gap-2 flex-wrap">
                      {COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => updateField("secondaryColor", c.value)}
                          className={`w-7 h-7 rounded-lg border-2 transition-all ${
                            settings.secondaryColor === c.value ? "border-portland-dark scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-portland-dark mb-2">Document Font</label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => updateField("fontFamily", e.target.value)}
                  className="w-full max-w-md px-4 py-2.5 bg-portland-light rounded-xl text-sm text-portland-dark focus:outline-none focus:ring-2 focus:ring-portland-red/20 transition-all"
                >
                  {FONTS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              {/* Preview */}
              <div className="p-4 rounded-xl border border-portland-mid/30 bg-white">
                <p className="text-xs text-portland-gray mb-2 uppercase tracking-wide">Preview</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: settings.accentColor }}>P</div>
                  <div>
                    <p className="font-semibold" style={{ color: settings.secondaryColor, fontFamily: settings.fontFamily }}>Portland Group of Schools</p>
                    <p className="text-sm text-portland-gray" style={{ fontFamily: settings.fontFamily }}>Excellence in Education</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Email Templates Tab ───────────────────────── */}
      {activeTab === "email" && (
        <div className="space-y-6">
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <h2 className="text-lg font-semibold text-portland-dark">Email Signature</h2>
              <p className="text-sm text-portland-gray mt-1">Appended to the bottom of all outgoing emails.</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-portland-dark mb-1.5">Signature</label>
                <textarea
                  value={settings.emailSignature || ""}
                  onChange={(e) => updateField("emailSignature", e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 bg-portland-light rounded-xl text-sm text-portland-dark focus:outline-none focus:ring-2 focus:ring-portland-red/20 transition-all resize-none"
                  placeholder="Kind regards,&#10;Your Name&#10;Portland Group of Schools"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-portland-dark mb-1.5">Email Footer</label>
                <Input
                  value={settings.emailFooter || ""}
                  onChange={(e) => updateField("emailFooter", e.target.value)}
                  placeholder="Portland Group of Schools · 188 Commissioner Street, Johannesburg"
                />
              </div>
            </div>
          </Card>

          {/* Email Preview */}
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <h2 className="text-lg font-semibold text-portland-dark">Email Preview</h2>
              <p className="text-sm text-portland-gray mt-1">How your emails will look to recipients.</p>
            </div>
            <div className="p-5">
              <div className="rounded-xl border border-portland-mid/30 overflow-hidden max-w-lg">
                <div className="p-6 text-center" style={{ backgroundColor: settings.accentColor }}>
                  <p className="text-white font-semibold text-lg">{settings.name}</p>
                  <p className="text-white/70 text-xs mt-0.5">Notification</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-portland-dark mb-3">Dear Parent,</p>
                  <p className="text-sm text-portland-gray mb-4">This is a sample notification email from {settings.name}.</p>
                  <div className="text-center my-4">
                    <span className="inline-block px-5 py-2 rounded-xl text-white text-sm font-semibold" style={{ backgroundColor: settings.accentColor }}>
                      View Details
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4 text-center text-xs text-portland-gray border-t border-portland-mid/20" style={{ backgroundColor: "#F9FAFB" }}>
                  <p className="whitespace-pre-line">{settings.emailFooter || settings.address || "Portland Group of Schools"}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Invoice Templates Tab ─────────────────────── */}
      {activeTab === "invoices" && (
        <div className="space-y-6">
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <h2 className="text-lg font-semibold text-portland-dark">Invoice Settings</h2>
              <p className="text-sm text-portland-gray mt-1">Configure how invoices appear and behave.</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Invoice Prefix"
                  value={settings.invoicePrefix}
                  onChange={(e) => updateField("invoicePrefix", e.target.value)}
                  placeholder="INV"
                />
                <Input
                  label="Currency Code"
                  value={settings.currency}
                  onChange={(e) => updateField("currency", e.target.value)}
                  placeholder="ZAR"
                />
                <Input
                  label="Currency Symbol"
                  value={settings.currencySymbol}
                  onChange={(e) => updateField("currencySymbol", e.target.value)}
                  placeholder="R"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-portland-dark mb-1.5">Invoice Notes</label>
                <textarea
                  value={settings.invoiceNotes || ""}
                  onChange={(e) => updateField("invoiceNotes", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-portland-light rounded-xl text-sm text-portland-dark focus:outline-none focus:ring-2 focus:ring-portland-red/20 transition-all resize-none"
                  placeholder="Payment is due within 30 days..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-portland-dark mb-1.5">Terms & Conditions</label>
                <textarea
                  value={settings.invoiceTerms || ""}
                  onChange={(e) => updateField("invoiceTerms", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-portland-light rounded-xl text-sm text-portland-dark focus:outline-none focus:ring-2 focus:ring-portland-red/20 transition-all resize-none"
                  placeholder="Late payments may incur..."
                />
              </div>
            </div>
          </Card>

          {/* Invoice Preview */}
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <h2 className="text-lg font-semibold text-portland-dark">Invoice Preview</h2>
              <p className="text-sm text-portland-gray mt-1">See how your invoices will look.</p>
            </div>
            <div className="p-5">
              <div className="rounded-xl border border-portland-mid/30 overflow-hidden bg-white max-w-2xl">
                <div className="flex justify-between items-start p-6 border-b-2" style={{ borderColor: settings.accentColor }}>
                  <div>
                    {settings.logoUrl && <img src={settings.logoUrl} alt="Logo" className="h-12 mb-2 object-contain" />}
                    <p className="font-bold text-lg" style={{ color: settings.accentColor }}>{settings.name}</p>
                    <p className="text-xs text-portland-gray">{settings.address || "Address"}</p>
                    <p className="text-xs text-portland-gray">{settings.phone || "Phone"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold" style={{ color: settings.accentColor }}>INVOICE</p>
                    <p className="text-sm text-portland-gray mt-1">{settings.invoicePrefix}-202609-0001</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-xs text-portland-gray uppercase tracking-wide mb-1">Bill To</p>
                      <p className="font-semibold text-sm">Student Name</p>
                      <p className="text-xs text-portland-gray">Student #: STU-001</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-portland-gray uppercase tracking-wide mb-1">Details</p>
                      <p className="text-sm">Status: <span className="font-semibold text-amber-600">PENDING</span></p>
                    </div>
                  </div>
                  <table className="w-full text-sm mb-4">
                    <thead>
                      <tr style={{ backgroundColor: settings.accentColor }}>
                        <th className="text-left text-white p-2.5 text-xs uppercase">Description</th>
                        <th className="text-right text-white p-2.5 text-xs uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-portland-mid/20">
                        <td className="p-2.5">Monthly Tuition - September 2026</td>
                        <td className="p-2.5 text-right font-semibold">{settings.currencySymbol} 800.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: settings.accentColor }}>Total: {settings.currencySymbol} 800.00</p>
                  </div>
                </div>
                {settings.invoiceNotes && (
                  <div className="px-6 pb-4">
                    <p className="text-xs text-portland-gray p-3 bg-portland-light rounded-lg">{settings.invoiceNotes}</p>
                  </div>
                )}
                <div className="px-6 py-3 text-center text-xs text-portland-gray border-t border-portland-mid/20" style={{ backgroundColor: "#F9FAFB" }}>
                  {settings.emailFooter || `${settings.name} · ${settings.address || ""}`}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Reports Tab ───────────────────────────────── */}
      {activeTab === "reports" && (
        <Card>
          <div className="p-5 border-b border-portland-mid/30">
            <h2 className="text-lg font-semibold text-portland-dark">Report Card Settings</h2>
            <p className="text-sm text-portland-gray mt-1">Configure how report cards appear.</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Principal Name"
                value={settings.principalName || ""}
                onChange={(e) => updateField("principalName", e.target.value)}
                placeholder="e.g. Mr. John Smith"
              />
              <Input
                label="Principal Title"
                value={settings.principalTitle || ""}
                onChange={(e) => updateField("principalTitle", e.target.value)}
                placeholder="Principal"
              />
            </div>
            <div className="p-4 rounded-xl border border-portland-mid/30 bg-portland-light/50">
              <p className="text-sm text-portland-dark">
                The principal&apos;s name and title will appear on report cards and transcripts under the signature area.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* ── System Tab ────────────────────────────────── */}
      {activeTab === "system" && (
        <div className="space-y-6">
          {/* System Info */}
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <h2 className="text-lg font-semibold text-portland-dark">System Information</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-portland-light/50">
                  <p className="text-xs text-portland-gray">Version</p>
                  <p className="text-sm font-semibold text-portland-dark">1.0.0</p>
                </div>
                <div className="p-3 rounded-xl bg-portland-light/50">
                  <p className="text-xs text-portland-gray">Environment</p>
                  <p className="text-sm font-semibold text-portland-dark">Production</p>
                </div>
                <div className="p-3 rounded-xl bg-portland-light/50">
                  <p className="text-xs text-portland-gray">Database</p>
                  <p className="text-sm font-semibold text-green-600">Connected</p>
                </div>
                <div className="p-3 rounded-xl bg-portland-light/50">
                  <p className="text-xs text-portland-gray">Curriculum</p>
                  <p className="text-sm font-semibold text-portland-dark">CAPS</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card>
            <div className="p-5 border-b border-portland-mid/30">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-portland-red" />
                <h2 className="text-lg font-semibold text-portland-dark">Security</h2>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-portland-light/50">
                <div>
                  <p className="text-sm font-medium text-portland-dark">Password</p>
                  <p className="text-xs text-portland-gray">Change your account password</p>
                </div>
                <a href="/admin/profile" className="text-sm font-medium" style={{ color: settings.accentColor }}>
                  Change
                </a>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-portland-light/50">
                <div>
                  <p className="text-sm font-medium text-portland-dark">Two-Factor Authentication</p>
                  <p className="text-xs text-portland-gray">Add an extra layer of security</p>
                </div>
                <Badge variant="warning">Coming Soon</Badge>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Sticky Save Bar */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-portland-mid/20 -mx-6 px-6 py-4 flex justify-end gap-3 -mb-6 rounded-b-xl">
        <Button variant="outline" onClick={fetchSettings}>Reset</Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}
