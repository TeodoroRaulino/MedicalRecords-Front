import API from "@/services/api";
import { NextPage } from "next";
import { toast } from "react-toastify";
import { Dashboard } from "@/layout/dashboard";
import { useRouter } from "next/router";
import Form from "./form";
import { MedicalRecordProps } from "@/types/MedicalRecord";
import { MEDICAL_RECORD_URL } from "@/utils/constants";

const Create: NextPage = () => {
  const router = useRouter();

  async function onSubmit(formValues: MedicalRecordProps) {
    const { userId } = router.query;

    const [photo] = formValues.photo;

    const formData = new FormData();

    formData.append("fullName", formValues.fullName);
    formData.append("cpf", formValues.cpf);
    formData.append("phoneNumber", formValues.phoneNumber);
    formData.append("photo", new Blob([photo], { type: "image/jpeg" }));
    formData.append("photoPath", formValues.photoPath);
    formData.append("userId", userId as string);
    formData.append("address", JSON.stringify(formValues.address));

    const response = await API.post("/medical-records", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch((err) => {
      toast.error(err.message);
    });

    const data = response?.data;

    if (response?.status === 201) {
      router.push(MEDICAL_RECORD_URL);
      toast.success(data.message);
    }
  }

  return <Form onCreate={onSubmit} />;
};

export default Dashboard(Create);
