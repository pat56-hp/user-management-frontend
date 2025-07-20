import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "src/components/ui/sidebar";

export function NavMain({ items }) {
  return (
    <SidebarGroup className="mt-5">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="gap-3">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink to={item.url} className="hover:cursor-pointer">
                {({ isActive }) => (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`hover:cursor-pointer p-5 ${
                      isActive &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                    }`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
