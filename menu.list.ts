import { MenuGroup } from "./menu.group";

export const MenuList: MenuGroup[] = [
    {
        title: "General",
        children: [
            {
                title: "Home",
                icon: "las la-home",
                route: "/dashboard/home",
                permissionName: "generalPermissions"
            },
            {
                title: "Admins",
                icon: "las la-user-tie",
                route: "/dashboard/admins",
                permissionName: "adminsPermissions"
            },
            {
                title: "Roles",
                icon: "las la-users-cog",
                route: "/dashboard/roles",
                permissionName: "rolesPermissions"
            }
        ]
    },
    {
        title: "Pages",
        children: [
            {
                title: "Messages",
                icon: "las la-envelope",
                route: "/dashboard/messages",
                permissionName: "messagesPermissions"
            },
            {
                title: "taxes",
                icon: "",
                route: "/dashboard/taxes",
                permissionName: "TaxesPermissions"
            },
            {
                title: "taxes",
                icon: "",
                route: "/dashboard/taxes",
                permissionName: "TaxesPermissions"
            }
        ]
    },
    {
        title: "More",
        children: [
            {
                title: "Translation Editor",
                icon: "las la-globe-europe",
                route: "/dashboard/translation-editor",
                permissionName: "generalPermissions"
            }
        ]
    }
];