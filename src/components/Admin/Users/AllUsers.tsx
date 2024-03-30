import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Button as ButtonShad } from "@/components/ui/button";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import CustomLoader from "../../../components/global/CustomLoader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "../../../../redux/features/user/userApi";
import { styles } from "../../../styles/style";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Loading from "../../../components/global/Loader";

type Props = {
  isTeam: boolean;
};

const AllCourses = ({ isTeam }: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [emailData, setEmailData] = useState("");
  const [role, setRole] = useState("user");

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    updateRole,
    { isLoading: roleIsLoading, isSuccess, error: roleError },
  ] = useUpdateRoleMutation({});
  const [
    deleteUser,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteSuccess,
      error: deleteError,
    },
  ] = useDeleteUserMutation({});

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Role changed successfully!");
    }
    if (roleError) {
      if ("data" in roleError) {
        const errorData = roleError as any;
        toast.error(errorData.data.message);
      }
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Successfully deleted the user!");
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, roleError, deleteSuccess, deleteError, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    { field: "updated_at", headerName: "Updated At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>
                  <AiOutlineDelete
                    className="dark:text-white text-black"
                    size={20}
                  />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the user and remove their data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteUser(params.row.id)}
                    className="bg-destructive/80 hover:bg-destructive text-white"
                  >
                    {deleteIsLoading ? <Loading /> : "Continue"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data &&
      data.users &&
      data.users.filter((user: any) => user.role === "admin");

    newData &&
      newData.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: format(user.createdAt),
          updated_at: format(user.updatedAt),
        });
      });
  } else {
    data &&
      data.users &&
      data.users.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: format(user.createdAt),
          updated_at: format(user.updatedAt),
        });
      });
  }

  const handleSubmit = async () => {
    let id = "";
    const userData =
      data &&
      data.users &&
      data.users.filter((user: any) => user.email === emailData);

    if (userData && role) {
      id = userData[0]._id;
      await updateRole({ id, role });
    }
    setOpen(!open);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="mt-[120px]">
          <Box m="20px">
            {isTeam && (
              <div className="flex w-full justify-end">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <ButtonShad
                      className={`${styles.button} !w-[180px] h-[40px] !bg-[#37a39a] hover:!bg-[#37a39adc] text-center !text-[#fff] !rounded-3xl cursor-pointer flex items-center justify-center`}
                      onClick={() => setOpen(!open)}
                    >
                      Add New Member
                    </ButtonShad>
                  </DialogTrigger>
                  <DialogContent className="md:w-[400px] w-full">
                    <DialogHeader>
                      <DialogTitle className="text-center font-semibold text-[24px] mb-3">
                        Add New Member
                      </DialogTitle>
                      <DialogDescription>
                        <Input
                          placeholder="Enter email..."
                          value={emailData}
                          onChange={(e: any) => setEmailData(e.target.value)}
                          required
                        />
                        <Select
                          onValueChange={(e) => setRole(e)}
                          defaultValue={role}
                        >
                          <SelectTrigger className="w-full mt-6">
                            <SelectValue placeholder="Select a role..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex items-center justify-center">
                      <ButtonShad
                        type="submit"
                        onClick={handleSubmit}
                        className="h-[40px] w-full !rounded-3xl mt-2 "
                      >
                        {roleIsLoading ? <Loading /> : "Save Changes"}
                      </ButtonShad>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            <Box
              m="40px 0 0 0"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #ffffff30 !important"
                      : "1px solid #ccc !important",
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column-cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  borderBottom: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  borderTop: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? "#b7ebde !important" : "#000 !important",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "#fff !important",
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default AllCourses;
