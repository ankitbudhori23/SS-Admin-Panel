import InputText from "../../components/Input/InputText";

const AddQuiz = () => {
  return (
    <div className="bg-base-100 shadow-xl ">
      <h2 className="fs-[20px] text-[#000]">Add a Quiz Question</h2>
      <form className="flex flex-col gap-4" onSubmit="">
        <InputText />
        <input
          type="text"
          placeholder="Option 1"
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Option 2"
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Option 3"
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Option 4"
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Class"
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Subject"
          className="input w-full max-w-xs"
        />
        <button className="btn btn-accent w-full" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
