import { Client } from "@prisma/client";
import prisma from "../utils/prisma.connection";

//* Services
export const listClients = async (): Promise<Client[]> => {
  return prisma.client.findMany({
    include: {
      account: true,
      userList: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      accountRep: true,
    },
  });
};

export const getClientById = async (id: string): Promise<Client | null> => {
  return prisma.client.findUnique({
    where: {
      id,
    },
    include: {
      account: true,
      userList: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      accountRep: true,
    },
  });
};

export const createClient = async (
  client: Omit<Client, "id">
): Promise<Client> => {
  const { name, type } = client;
  return prisma.client.create({
    data: {
      name,
      type,
    },
    include: {
      account: true,
      userList: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      accountRep: true,
    },
  });
};

export const updateClientById = async (
  client: Omit<Client, "id">,
  id: string
): Promise<Client> => {
  const { name, type, accountRepId } = client;
  return prisma.client.update({
    where: {
      id,
    },
    data: {
      name,
      type,
      accountRepId,
    },
    include: {
      account: true,
      userList: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      accountRep: true,
    },
  });
};

export const deleteClient = async (id: string): Promise<void> => {
  await prisma.client.delete({
    where: {
      id,
    },
  });
};
