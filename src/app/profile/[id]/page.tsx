// "{params}: any" => The type should be changed according to the
// requirements of the application.

export default function ProfileIdPage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-6 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
