import { currentUser } from "@clerk/nextjs/server";
import { addUserData } from "@/lib/actions/user-data";

export async function ProfileForm() {
  const user = await currentUser();

  async function submit(formData: FormData) {
    "use server";
    const type = formData.get("type") as "person" | "company";
    const description = formData.get("description") as string;

    if (!user?.id || !type || !description) return;

    const a = await addUserData({ userId: user?.id, type, description });

    console.log("response");
    console.log(a);
  }

  return (
    <form action={submit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block mb-1">
          Type
        </label>
        <select
          id="type"
          name="type"
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a type...</option>
          <option value="person">Person</option>
          <option value="company">Company</option>
        </select>
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Profile
      </button>
    </form>
  );
}
