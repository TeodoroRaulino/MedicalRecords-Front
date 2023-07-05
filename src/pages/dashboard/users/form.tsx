import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Link from "next/link";
import { NAME_VALIDATION_REGEX, USER_URL } from "@/utils/constants";
import Button from "@/components/Button";

export type UserProps = {
  name: string;
  password: string;
  email: string;
  role: number;
};

type Props = {
  onCreate?: (formValues: UserProps) => Promise<void>;
  onEdit?: (formValues: UserProps) => Promise<void>;
  data?: UserProps;
};

const Form = ({ onCreate, onEdit, data }: Props) => {
  const isEditing = Boolean(data);

  const validationSchema = yup.object().shape({
    name: yup.string().required().matches(NAME_VALIDATION_REGEX, {
      message: "Nome inválido",
    }),
    password: yup.string().required(),
    email: yup.string().email().required().matches(NAME_VALIDATION_REGEX, {
      message: "Email inválido",
    }),
    role: yup.number().required(),
  });

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserProps>({
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  });

  const handleFormSubmit = async (formValues: UserProps) => {
    setLoading(true);
    if (isEditing && onEdit) {
      await onEdit(formValues);
    } else if (!isEditing && onCreate) {
      await onCreate(formValues);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full p-10 bg-white">
        {!isEditing ? (
          <h1 className="font-bold text-black text-5xl pb-10">Criar Usuário</h1>
        ) : (
          <h1 className="font-bold text-black text-5xl pb-10">
            Editar Usuário: {data?.name}
          </h1>
        )}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid w-full grid-cols-12 gap-6 p-5 rounded-lg bg-gray-100 text-black"
        >
          <div className="flex flex-col mb-4 col-span-6 mt-1 sm:col-span-6">
            <label className="mb-2 ml-2 font-semibold text-gray-600 text-sm">
              Nome
            </label>
            <input
              type="text"
              className="h-10 w-full border-gray-300 border rounded-full pl-5 text-gray-600"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {!isEditing && (
            <div className="flex flex-col mb-4 col-span-6 mt-1 sm:col-span-6">
              <label className="mb-2 ml-2 font-semibold text-gray-600 text-sm">
                Senha
              </label>
              <input
                type="text"
                {...register("password")}
                className="h-10 w-full border-gray-300 border rounded-full pl-5 text-gray-600"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col mb-4 col-span-6 mt-1 sm:col-span-6">
            <label className="mb-2 ml-2 font-semibold text-gray-600 text-sm">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="h-10 w-full border-gray-300 border rounded-full pl-5 text-gray-600"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col mb-4 col-span-6 mt-1 sm:col-span-6">
            <label className="mb-2 ml-2 font-semibold text-gray-600 text-sm">
              Função
            </label>
            <select
              {...register("role")}
              className="h-10 w-full border-gray-300 border rounded-full pl-5 text-gray-600"
            >
              <option value={0} selected={data?.role === 0}>
                Médico
              </option>
              <option value={1} selected={data?.role === 1}>
                Paciente
              </option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="flex col-span-12 pt-5 sm:col-span-12 gap-4 justify-end">
            <Button
              title={isEditing ? "Atualizar" : "Salvar"}
              loading={loading}
            />
            <Link href={USER_URL}>
              <button className="text-lg col-span-5 sm:col-span-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Voltar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
