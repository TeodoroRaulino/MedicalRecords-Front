export type MedicalRecordProps = {
  id?: number;
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
  userId?: number;
};
