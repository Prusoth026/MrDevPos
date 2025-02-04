import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const DEMO_USERS = {
  admin: {
    email: "admin",
    password: "1234",
    role: "admin"
  },
  employee: {
    email: "employee",
    password: "1234",
    role: "employee"
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const adminUser = DEMO_USERS.admin;
    const employeeUser = DEMO_USERS.employee;

    let user = null;
    if (email === adminUser.email && password === adminUser.password) {
      user = adminUser;
    } else if (email === employeeUser.email && password === employeeUser.password) {
      user = employeeUser;
    }

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", user.role);
      toast.success(`Welcome back, ${user.role}!`);
      navigate(user.role === "admin" ? "/" : "/pos");
    } else {
      toast.error("Invalid credentials");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-gradient p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Mr Dev Pos Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the system
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">UserName</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="text-sm text-muted-foreground text-center space-y-2">
              <p>Demo Admin: admin / 1234</p>
              <p>Demo Employee: employee / 1234</p>
            </div> 
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;