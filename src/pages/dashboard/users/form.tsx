import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Link from "next/link";

export type UserProps = {
  name: string;
  password: string;
  email: string;
  role: number;
};

type Props = {
  onSubmit: (formValues: UserProps) => Promise<void>;
  data?: UserProps;
};

const Form = (props: Props) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.number().required(),
  });

  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<UserProps>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formValues: UserProps) => {
    setLoading(true);
    await props.onSubmit(formValues);
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-6 gap-6 p-5 rounded bg-gray-100 text-black"
      >
        <div className="col-span-6 mt-1 sm:col-span-3">
          <label className="w-full font-light">Nome</label>
          <input
            defaultValue={props.data?.name}
            {...register("name")}
            type="text"
            className="w-full font-light bg-white border-2 border-gray-300 border-solid rounded form-input"
          />
        </div>

        <div className="col-span-6 mt-1 sm:col-span-3">
          <label className="w-full font-light">Senha</label>
          <input
            defaultValue={props.data?.password}
            {...register("password")}
            type="password"
            className="w-full font-light bg-white border-2 border-gray-300 border-solid rounded form-input"
          />
        </div>

        <div className="col-span-6 mt-1 sm:col-span-3">
          <label className="w-full font-light">Email</label>
          <input
            defaultValue={props.data?.email}
            {...register("email")}
            type="text"
            className="w-full font-light bg-white border-2 border-gray-300 border-solid rounded form-input"
          />
        </div>

        <div className="col-span-6 mt-1 sm:col-span-3">
          <label className="w-full font-light">Cargo</label>
          <select
            defaultValue={props.data?.role}
            {...register("role")}
            className="w-full font-light bg-white border-2 border-gray-300 border-solid rounded form-input"
          >
            <option value={0}>Médico</option>
            <option value={1}>Paciente</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-6 mt-1 sm:col-span-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Carregando..." : "Salvar"}
        </button>

        <Link href="/dashboard/users">
          <span className="col-span-6 mt-1 sm:col-span-3 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Voltar
          </span>
        </Link>
      </form>
    </>
  );
};

export default Form;
