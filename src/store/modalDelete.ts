import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import API from "../services/api";
import { create } from "zustand";

type State = {
  isOpen: boolean;
  urlToAction: string;
  modalContent: string;
  response?: AxiosResponse<any>;
  openModal: (url: string, content: string) => void;
  closeModal: () => void;
  deleteAction: () => Promise<void>;
};

const initialState = {
  isOpen: false,
  urlToAction: "",
  modalContent: "",
  response: undefined,
  openModal: () => {},
  closeModal: () => {},
  deleteAction: () => Promise.resolve(),
};

export const useModalDeleteStore = create<State>((set, get) => ({
  ...initialState,
  openModal: (url, content) => {
    set({
      isOpen: true,
      urlToAction: url,
      modalContent: content,
    });
  },
  closeModal: () => {
    set({
      isOpen: false,
      urlToAction: "",
      modalContent: "",
    });
  },
  deleteAction: async () => {
    try {
      const response = await API.delete(get().urlToAction);
      set({
        response: response,
      });
      toast.success("Registro excluído com sucesso!");

      //Todo: Solução temporária para atualizar a página após excluir um registro, pensar em outra forma de fazer isso.
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      set({ isOpen: false });
    } catch (error) {
      toast.error("Erro ao excluir registro!");
    }
  },
}));
