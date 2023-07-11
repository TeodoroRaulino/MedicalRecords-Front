import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { MedicalRecordProps } from "@/types/MedicalRecord";
import Button from "@/components/Button";
import {
  CEP_VALIDATION_REGEX,
  CPF_VALIDATION_REGEX,
  NAME_VALIDATION_REGEX,
  PHONE_VALIDATION_REGEX,
} from "@/utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { userIdProps } from "./create";

type Props = {
  onCreate?: (formValues: MedicalRecordProps) => Promise<void>;
  onEdit?: (formValues: MedicalRecordProps) => Promise<void>;
  data?: MedicalRecordProps;
  userData?: userIdProps;
};

type MedicalRecordFormValues = {
  fullName: string;
  cpf: string;
  phoneNumber: string;
  photo: File[];
  photoPath: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

type ResolverType = Resolver<MedicalRecordFormValues, any>;

const Form = ({ onCreate, onEdit, data, userData }: Props) => {
  const isEditing = Boolean(data);

  const [loading, setLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("Campo obrigatório")
      .matches(NAME_VALIDATION_REGEX, "Nome inválido"),
    cpf: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        CPF_VALIDATION_REGEX,
        "CPF inválido, o formato é 999.999.999-99"
      ),
    phoneNumber: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        PHONE_VALIDATION_REGEX,
        "Telefone inválido, o formato é +5599999999999"
      ),
    photo: yup.mixed().required("Campo obrigatório"),
    photoPath: yup.string().notRequired(),
    street: yup
      .string()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return null;
        }
        return value;
      })
      .nullable(),
    neighborhood: yup
      .string()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return null;
        }
        return value;
      })
      .nullable(),
    city: yup
      .string()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return null;
        }
        return value;
      })
      .nullable(),
    state: yup
      .string()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return null;
        }
        return value;
      })
      .nullable(),
    postalCode: yup
      .string()
      .transform((value, originalValue) => {
        if (originalValue !== "") {
          return value;
        } else {
          return null;
        }
      })
      .matches(CEP_VALIDATION_REGEX, "CEP inválido, o formato é 99999-999")
      .nullable(),
  });

  const customResolver: ResolverType = yupResolver(
    validationSchema
  ) as ResolverType;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MedicalRecordProps>({
    resolver: customResolver,
    defaultValues: data,
  });

  const handleFormSubmit = async (formValues: MedicalRecordProps) => {
    setLoading(true);
    if (isEditing && onEdit) {
      await onEdit(formValues);
    } else if (!isEditing && onCreate) {
      await onCreate(formValues);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data?.photo) {
      const blob = "data:image/jpeg;base64," + data.photo;

      setImageSrc(blob);
    }
  }, [data?.photo]);

  return (
    <>
      <div className="w-full p-10 bg-white">
        {!isEditing ? (
          <h1 className="text-3xl font-bold text-gray-800">Criar Prontuário</h1>
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">
            Editar Prontuário
          </h1>
        )}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="text-black"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col relative group">
              <label
                className="text-gray-800 font-bold group-hover:opacity-100"
                htmlFor="fullName"
              >
                Nome Completo
              </label>
              <span className="tooltip absolute top-0 right-0 p-1 bg-gray-800 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Nome não pode ser editado!
              </span>
              <input
                className="border border-gray-300 p-2 rounded-lg group-hover:opacity-100"
                type="text"
                readOnly
                defaultValue={userData?.name}
                placeholder="Informe o nome completo"
                {...register("fullName")}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="cpf">
                CPF
              </label>
              <input
                placeholder="Informe o CPF"
                type="text"
                {...register("cpf")}
                className="border border-gray-300 p-2 rounded-lg"
              />
              {errors.cpf && (
                <span className="text-red-500">{errors.cpf.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="phoneNumber">
                Telefone
              </label>
              <input
                placeholder="Informe o telefone"
                type="text"
                {...register("phoneNumber")}
                className="border border-gray-300 p-2 rounded-lg"
              />
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="photo">
                Nome da foto
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg"
                type="text"
                placeholder="Informe o nome da foto"
                {...register("photoPath")}
              />
              {errors.photoPath && (
                <span className="text-red-500">{errors.photoPath.message}</span>
              )}
              <div className="flex flex-row items-center justify-start">
                {isEditing && imageSrc && (
                  <img
                    className="w-20 h-20 rounded-full object-cover mt-2 mr-3"
                    src={imageSrc}
                    alt="Foto do paciente"
                  />
                )}
                <input type="file" className="my-2" {...register("photo")} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Informações de endereço (Opcional)
              </h2>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="address">
                Endereço
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg"
                type="text"
                placeholder="Informe o endereço"
                {...register("street")}
              />
              {errors?.street && (
                <span className="text-red-500">{errors.street.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="address">
                Bairro
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg"
                type="text"
                placeholder="Informe o bairro"
                {...register("neighborhood")}
              />
              {errors?.neighborhood && (
                <span className="text-red-500">
                  {errors.neighborhood.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="address">
                Cidade
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg"
                type="text"
                placeholder="Informe a cidade"
                {...register("city")}
              />
              {errors?.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="address">
                Estado
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg"
                type="text"
                placeholder="Informe o estado"
                {...register("state")}
              />
              {errors?.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold" htmlFor="address">
                CEP
              </label>
              <input
                placeholder="Informe o CEP"
                type="text"
                {...register("postalCode")}
                className="border border-gray-300 p-2 rounded-lg"
              />
              {errors?.postalCode && (
                <span className="text-red-500">
                  {errors.postalCode.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              title={isEditing ? "Atualizar" : "Salvar"}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
