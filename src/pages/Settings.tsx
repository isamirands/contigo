import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, User, Shield, HelpCircle, LogOut, Moon } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Ajustes</h1>
          <p className="text-sm text-muted-foreground mt-1">Personaliza tu experiencia</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Perfil</h2>
          <Card className="p-5">
            <button className="w-full flex items-center gap-4 hover:bg-muted/50 transition-colors p-2 rounded-lg -m-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-lg">Usuario de Contigo</p>
                <p className="text-sm text-muted-foreground">Ver y editar perfil</p>
              </div>
            </button>
          </Card>
        </section>

        {/* Preferences */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Preferencias</h2>
          <Card className="divide-y">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Notificaciones</p>
                  <p className="text-sm text-muted-foreground">Recordatorios diarios</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
                className="scale-125"
              />
            </div>

            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Modo oscuro</p>
                  <p className="text-sm text-muted-foreground">Tema de la aplicación</p>
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
                className="scale-125"
              />
            </div>
          </Card>
        </section>

        {/* Support & Info */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Soporte</h2>
          <Card className="divide-y">
            <button className="w-full p-5 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left">
              <Shield className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">Privacidad y seguridad</p>
                <p className="text-sm text-muted-foreground">Gestiona tus datos</p>
              </div>
            </button>

            <button className="w-full p-5 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left">
              <HelpCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">Ayuda y tutoriales</p>
                <p className="text-sm text-muted-foreground">Aprende a usar Contigo</p>
              </div>
            </button>
          </Card>
        </section>

        {/* Logout */}
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full h-14 text-base gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </Button>

        {/* Version */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Contigo v1.0.0
        </p>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
