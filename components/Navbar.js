'use client'
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, User, Avatar, Input, NavbarMenu, NavbarMenuItem, Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./Icons";
import Link from "next/link";
import { NavbarItemCustom } from "./NavbarItemCustom";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { usePathname } from 'next/navigation'
import Image from "next/image";

export default function App() {
	const { data: session, status } = useSession()
	const pathname = usePathname()

	const icons = {
		chevron: <ChevronDown fill="currentColor" size={16} />,
		scale: <Scale className="text-warning" fill="currentColor" size={30} />,
		lock: <Lock className="text-success" fill="currentColor" size={30} />,
		activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
		flash: <Flash className="text-primary" fill="currentColor" size={30} />,
		server: <Server className="text-success" fill="currentColor" size={30} />,
		user: <TagUser className="text-danger" fill="currentColor" size={30} />,
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	
	const menuItems = [
		{ name: "Home", href: "/" },
		{ name: "Interview", href: "/interview" },
		{ name: "History", href: "/history" },
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="2xl" className="select-none" theme="light">
			<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((item, index) => (
					<NavbarItemCustom key={item.href} exact href={item.href} sep={index != menuItems.length - 1}>
						{item.name}
					</NavbarItemCustom>
				))}
			</NavbarContent>

			<NavbarContent as="div" className="items-center relative" justify="end">
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						{/* <Avatar
							as="button"
							className="transition-transform"
							color="secondary"
							name="User Avatar"
							size="md"
							src={session?.user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
						/> */}
						<Image
							as="button"
							alt="User Avatar"
							className="transition-transform cursor-pointer rounded-full border-2 border-zinc-500"
							color="secondary"
							name="User Avatar"
							size="md"
							src={session?.user?.image || "https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok="}
							width={42}
							height={42}
						/>
					</DropdownTrigger>

					{
						session?.user ? <DropdownMenu className="text-dark" aria-label="Profile Actions" variant="flat">
							<DropdownItem href={"/user"} key="profile" className="h-14 gap-2" as={Link}>
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">{session.user.email}</p>
							</DropdownItem>
							{/* {session?.user?.role == "admin" && <DropdownItem href="/councelling" key="admin" as={Link}>Councelling</DropdownItem>} */}
							<DropdownItem onClick={async (e) => {
								e.preventDefault()
								await signOut({ redirect: false })
								toast.success('Logout Successful!');
							}} key="logout" color="danger">Log Out</DropdownItem>
						</DropdownMenu> : <DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem href={"/login?next=" + pathname} key="login" as={Link}>Log In</DropdownItem>
						</DropdownMenu>
					}

				</Dropdown>
			</NavbarContent>

			<NavbarMenu className="pt-[5rem]">
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={index}>
						<Link href={item.href} className="w-full" onClick={() => setIsMenuOpen(false)}>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
