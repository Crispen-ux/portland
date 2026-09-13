"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  PageHeader,
  Button,
  Input,
  Badge,
} from "@/components/ui";
import {
  Save,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  Shield,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [school, setSchool] = useState({
    name: "Portland Group of Schools",
    address: "188 Commissioner Street, Corner Commissioner & Polly Street",
    city: "Johannesburg",
    phone: "+27 82 815 4388",
    email: "info@portlandschools.co.za",
    website: "https://www.portlandschools.co.za",
  });

  const [notifications, setNotifications] = useState({
    emailOnEnrolment: true,
    emailOnPayment: true,
    emailOnAnnouncement: false,
    smsNotifications: false,
  });

  const handleSaveSchool = async () => {
    setSuccess("");
    setError("");
    try {
      // TODO: API call to save school settings
      setSuccess("School settings saved.");
    } catch {
      setError("Failed to save settings.");
    }
  };

  const handleSaveNotifications = async () => {
    setSuccess("");
    setError("");
    try {
      // TODO: API call to save notification preferences
      setSuccess("Notification preferences saved.");
    } catch {
      setError("Failed to save notification preferences.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage school information and platform preferences."
      />

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* School Information */}
      <Card>
        <div className="p-5 border-b border-portland-mid/30">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-portland-red" />
            <h2 className="text-lg font-semibold text-portland-dark">School Information</h2>
          </div>
          <p className="text-sm text-portland-gray mt-1">Basic information about your school.</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="School Name"
              value={school.name}
              onChange={(e) => setSchool({ ...school, name: e.target.value })}
            />
            <Input
              label="Phone"
              value={school.phone}
              onChange={(e) => setSchool({ ...school, phone: e.target.value })}
              icon={<Phone className="w-4 h-4" />}
            />
            <Input
              label="Email"
              value={school.email}
              onChange={(e) => setSchool({ ...school, email: e.target.value })}
              icon={<Mail className="w-4 h-4" />}
            />
            <Input
              label="Website"
              value={school.website}
              onChange={(e) => setSchool({ ...school, website: e.target.value })}
              icon={<Globe className="w-4 h-4" />}
            />
          </div>
          <Input
            label="Address"
            value={school.address}
            onChange={(e) => setSchool({ ...school, address: e.target.value })}
            icon={<MapPin className="w-4 h-4" />}
          />
          <Input
            label="City"
            value={school.city}
            onChange={(e) => setSchool({ ...school, city: e.target.value })}
          />
          <div className="flex justify-end">
            <Button onClick={handleSaveSchool}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <div className="p-5 border-b border-portland-mid/30">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-portland-red" />
            <h2 className="text-lg font-semibold text-portland-dark">Notification Preferences</h2>
          </div>
          <p className="text-sm text-portland-gray mt-1">Choose how you want to be notified.</p>
        </div>
        <div className="p-5 space-y-3">
          {[
            { key: "emailOnEnrolment", label: "Email on new enrolment" },
            { key: "emailOnPayment", label: "Email on payment received" },
            { key: "emailOnAnnouncement", label: "Email on new announcement" },
            { key: "smsNotifications", label: "SMS notifications" },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3 p-3 rounded-xl hover:bg-portland-light/50 cursor-pointer">
              <input
                type="checkbox"
                checked={(notifications as any)[item.key]}
                onChange={(e) =>
                  setNotifications({ ...notifications, [item.key]: e.target.checked })
                }
                className="w-4 h-4 rounded border-[#D1D5DB] text-[#C41E3A] focus:ring-[#C41E3A]/20"
              />
              <span className="text-sm text-portland-dark">{item.label}</span>
            </label>
          ))}
          <div className="flex justify-end pt-2">
            <Button onClick={handleSaveNotifications}>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
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
          <p className="text-sm text-portland-gray mt-1">Manage account security settings.</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-portland-light/50">
            <div>
              <p className="text-sm font-medium text-portland-dark">Password</p>
              <p className="text-xs text-portland-gray">Last changed: Unknown</p>
            </div>
            <a href="/admin/profile" className="text-sm text-[#C41E3A] hover:text-[#A01830] font-medium">
              Change
            </a>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-portland-light/50">
            <div>
              <p className="text-sm font-medium text-portland-dark">Two-Factor Authentication</p>
              <p className="text-xs text-portland-gray">Not enabled</p>
            </div>
            <Badge variant="warning">Coming Soon</Badge>
          </div>
        </div>
      </Card>

      {/* System Info */}
      <Card>
        <div className="p-5 border-b border-portland-mid/30">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-portland-red" />
            <h2 className="text-lg font-semibold text-portland-dark">System Information</h2>
          </div>
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
    </div>
  );
}
