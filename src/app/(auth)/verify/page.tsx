import { Card } from "@/components/ui/Card";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Check your email
        </h1>
        <Card>
          <p className="text-gray-600">
            We sent you a magic link. Click it to sign in and start your
            coaching journey.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Didn&apos;t get the email? Check your spam folder or try again.
          </p>
        </Card>
      </div>
    </div>
  );
}
