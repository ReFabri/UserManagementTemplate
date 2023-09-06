import FormContainer from "@/app/_components/FormContainer";

export default function ProfileIdPage({ params }: any) {
  return (
    <FormContainer formName="Profile">
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-6 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </FormContainer>
  );
}
