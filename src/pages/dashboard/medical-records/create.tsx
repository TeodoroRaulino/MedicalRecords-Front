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
    const { patientId } = router.query;

    formValues.userId = parseInt(patientId as string, 10);

    const response = await API.post(
      "/medical-records",
      {
        ...formValues,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).catch((err) => {
      toast.error(err.message);
    });

    const data = response?.data;
    console.log(response);

    if (response?.status === 201) {
      router.push(MEDICAL_RECORD_URL);
      toast.success(data.message);
    }
  }

  return <Form onCreate={onSubmit} />;
};

export default Dashboard(Create);
