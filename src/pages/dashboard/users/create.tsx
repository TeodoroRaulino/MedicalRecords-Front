import API from "@/services/api";
import { NextPage } from "next";
import { toast } from "react-toastify";
import Form, { UserProps } from "./form";
import { Dashboard } from "@/layout/dashboard";
import { USER_URL } from "@/utils/constants";
import Router from "next/router";

const Create: NextPage = () => {
  async function onSubmit(formValues: UserProps) {
    const response = await API.post("/users", { ...formValues }).catch(
      (err) => {
        toast.error(err.message);
      }
    );

    const data = response?.data;

    if (response?.status === 201) {
      Router.push(USER_URL);
      toast.success(data.message);
    }
  }

  return <Form onCreate={onSubmit} />;
};

export default Dashboard(Create);
