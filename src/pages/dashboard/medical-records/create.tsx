import API from "@/services/api";
import { NextPage } from "next";
import { toast } from "react-toastify";
import { Dashboard } from "@/layout/dashboard";
import { useRouter } from "next/router";
import Form from "./form";
import { MedicalRecordProps } from "@/types/MedicalRecord";
import { MEDICAL_RECORD_URL } from "@/utils/constants";
import { useEffect, useState } from "react";

export type userIdProps = {
  userId: string;
  name: string;
};

const Create: NextPage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<userIdProps>();

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
    formData.append("street", formValues.street as string);
    formData.append("neighborhood", formValues.neighborhood as string);
    formData.append("city", formValues.city as string);
    formData.append("state", formValues.state as string);
    formData.append("postalCode", formValues.postalCode as string);

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

  useEffect(() => {
    async function LoadUserData() {
      if (!router.query.userId) {
        return;
      }

      const response = await API.get(`/users/${router.query.userId}`).catch(
        (err) => {
          toast.error(err.message);
        }
      );

      const data = response?.data;

      if (response?.status === 200) {
        const { id, name } = data;

        const setData: userIdProps = {
          userId: id,
          name: name,
        };

        setUserData(setData);
      }
    }

    LoadUserData();
  }, [router.query.userId]);

  return <Form onCreate={onSubmit} userData={userData} />;
};

export default Dashboard(Create);
