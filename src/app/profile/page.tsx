import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Individual Profile</h2>
          <p className="mb-4">Create or update your individual profile</p>
          <div className="space-y-2">
            <Link href="/profile/personal/create" className="block w-full">
              Create Profile
            </Link>
            <Link href="/profile/personal/update" className="block w-full">
              Update Profile
            </Link>
          </div>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Company Profile</h2>
          <p className="mb-4">Create or update your company profile</p>
          <div className="space-y-2">
            <Link href="/profile/company/create" className="block w-full">
              Create Company Profile
            </Link>
            <Link href="/profile/company/update" className="block w-full">
              Update Company Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
