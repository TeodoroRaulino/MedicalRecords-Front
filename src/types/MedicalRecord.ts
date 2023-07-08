export type MedicalRecordProps = {
  id?: number;
  fullName: string;
  cpf: string;
  phoneNumber: string;
  photo: File[];
  photoPath: string;
  address?: Address;
  userId?: number;
};

export type Address = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
};
