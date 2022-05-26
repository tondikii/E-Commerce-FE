import UilPlus from "@iconscout/react-unicons/icons/uil-plus-circle";

export default function AddButton({logoSize}) {
  return (
    <button className="bg-blue-900 py-2 px-4 rounded-md">
      <UilPlus size={logoSize} color="white" />
    </button>
  );
}
