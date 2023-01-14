import { Prisma, User } from "@prisma/client";
import prisma from "../utils/prisma.connection";

//* Services
//* For Admin

const adminUserNoPw = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    role: true,
    userClient: {
      select: {
        name: true,
      },
    },
    accRepClient: {
      select: {
        name: true,
      },
    },
  },
});

type AdminUserNoPw = Prisma.UserGetPayload<typeof adminUserNoPw>;

export const adminListUsers = async (): Promise<AdminUserNoPw[]> => {
  return prisma.user.findMany({
    include: {
      userClient: {
        select: {
          name: true,
        },
      },
      accRepClient: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const adminGetUserById = async (
  id: string
): Promise<AdminUserNoPw | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      userClient: {
        select: {
          name: true,
        },
      },
      accRepClient: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const adminCreateUser = async (
  user: Omit<User, "id">
): Promise<User> => {
  const { email, firstName, lastName, password, role, userClientId } = user;
  return prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password,
      role,
      userClientId,
    },
    include: {
      userClient: {
        select: {
          name: true,
        },
      },
      accRepClient: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const adminUpdateUser = async (
  user: Omit<User, "id">,
  id: string
): Promise<User> => {
  const { email, firstName, lastName, password, role, userClientId } = user;
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      firstName,
      lastName,
      password,
      role,
      userClientId,
    },
    include: {
      userClient: {
        select: {
          name: true,
        },
      },
      accRepClient: {
        select: {
          name: true,
        },
      },
    },
  });
};

//* For Client

const clientUserNoRole = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    password: true,
    userClient: {
      select: {
        name: true,
      },
    },
  },
});

type ClientUserAccess = Prisma.UserGetPayload<typeof clientUserNoRole>;

export const ClientGetUserById = async (
  id: string
): Promise<ClientUserAccess | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      password: true,
      userClient: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const clientUpdateUser = async (
  user: Omit<ClientUserAccess, "id">,
  id: string
): Promise<ClientUserAccess> => {
  const { email, firstName, lastName, password } = user;
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      firstName,
      lastName,
      password,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      password: true,
      userClient: {
        select: {
          name: true,
        },
      },
    },
  });
};

//* For All

const userSession = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    password: true,
    role: true,
  },
});

type UserSession = Prisma.UserGetPayload<typeof userSession>;

export const getUserSession = async (
  email: string
): Promise<UserSession | null> => {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      password: true,
      role: true,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};
