import React, { useEffect, useState } from "react";
import AuthedLayout from '../layouts/authed_layout'
import { CategoryApi } from "../api/categories";
import { PlusIcon } from "@heroicons/react/outline";
import CategoryListItem from "../../components/CategoryListItem";
import Link from "next/link";
import useSWR from "swr";
import useCategories from "../../utils/useCategories";

const NewCategoryButton = () => (
	<Link href="/categories/create" passHref>
		<li 
			className="hover:bg-gray-50 border-2 border-gray-200 text-gray-300 cursor-pointer text-lg h-28 rounded-md flex justify-center items-center"
		>
			<PlusIcon className="w-6 h-6 mr-2"/>
			New Category
		</li>
	</Link>
)

function Categories() {
	// const api = new CategoryApi();
	// api.setup();
  // const fetcher = () => api.getUserCategories()
	// const {data, error} = useSWR(`/api/v1.0/users/current_user/categories`, fetcher)
	const {data, error, isLoading} = useCategories()

	if(error) return <div>Error loading page...</div>

	if(isLoading) {
		return (
			<div>Loading categories...</div>
		)
	}

	return (
		<AuthedLayout>
			<div className="py-10">
				{
					!data?.categories ? (
						<div>Loading your Categories...</div>
					) : (
						<>
							<div className="flex justify-between items-center mb-10">
								<h1 className="text-5xl font-bold">Your Categories</h1>
								<div className="text-gray-500">{data.categories.length} Categories</div>
							</div>
							<ul className="grid grid-cols-3 gap-4">
								{data.categories.map((category, index) => (
									<CategoryListItem key={index} category={category} />
								))}

								<NewCategoryButton />
							</ul>
						</>
					)

				}
			</div>
		</AuthedLayout>
	)
}



export default Categories