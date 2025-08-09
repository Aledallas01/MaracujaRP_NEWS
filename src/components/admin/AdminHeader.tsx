// src/components/admin/AdminHeader.tsx

import React from "react";
import { Palmtree, LogOut, User, Clock } from "lucide-react";
import { AdminUser } from "../../types";

interface AdminHeaderProps {
  currentAdmin: AdminUser;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentAdmin,
  onLogout,
}) => {
  const formatLastLogin = (date: Date) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { label: "Super Admin", color: "from-red-500 to-pink-500" },
      admin: { label: "Admin", color: "from-orange-500 to-amber-500" },
      moderator: { label: "Moderator", color: "from-green-500 to-teal-500" },
    };

    const config =
      roleConfig[role as keyof typeof roleConfig] || roleConfig.admin;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${config.color} text-white`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <header className="bg-gradient-to-r from-teal-800/80 to-emerald-800/80 backdrop-blur-sm border-b border-teal-400/30 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg shadow-lg">
              <Palmtree className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-teal-200">
                Gestione Regolamento Maracuja RP
              </p>
            </div>
          </div>

          {/* Admin Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <div className="flex items-center space-x-2 mb-1">
                <User className="h-4 w-4 text-teal-300" />
                <span className="text-white font-medium">
                  {currentAdmin.username}
                </span>
                {getRoleBadge(currentAdmin.role)}
              </div>
              <div className="flex items-center space-x-2 text-xs text-teal-200">
                <Clock className="h-3 w-3" />
                <span>
                  Ultimo accesso: {formatLastLogin(currentAdmin.lastLogin)}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-700/50 hover:bg-teal-600/50 text-teal-200 hover:text-white rounded-lg transition-colors border border-teal-400/30"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
