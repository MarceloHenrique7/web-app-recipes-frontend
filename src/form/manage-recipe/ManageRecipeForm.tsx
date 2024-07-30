import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import IngredientsSection from './IngredientsSection';
import CategorySection from './CategorySection';
import InstructionsSection from './InstructionsSection';
import NutrientsSection from './NutrientsSection';
import ImageSection from './ImageSection';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/LoadingButton';
import { useEffect } from 'react';
import { Recipe } from '@/types';
import SalesSetupSection from './SalesSetupSection';
import PrivacyRecipeSection from './PrivacyRecipeSection';


export const formSchema = z.object({
    name: z.string({
        required_error: "recipe name is required"
    }),
    description: z.string({
        required_error: "recipe description is required"
    }),
    prepTime: z.coerce.number().min(1, "prepTime of ingredient is required"),
    cookTime: z.coerce.number().min(1, "cookTime of ingredient is required"),
    serving: z.coerce.number().min(1, "serving of ingredient is required"),

    
    nutrients: z.array(z.object({
        calories: z.coerce.number().min(1, "calories is required"),
        fat: z.coerce.number().min(1, "fat is required"),
        protein: z.coerce.number().min(1, "protein is required"),
        carbohydrate: z.coerce.number().min(1, "carbohydrate is required"),
    })),

    categories: z.array(z.string()).nonempty({
        message: "please select at least one item"
    }),

    ingredients: z.array(z.object({
        name: z.string().min(1, "name of ingredient is required"),
        quantity: z.coerce.number().min(1, "quantity of ingredient is required"),
        unit: z.string().min(1, "unit of ingredient is required"),
    })),
    
    instructions: z.array(z.object({
        title: z.string().min(1, "title of instruction is required"),
        subtitle: z.string().min(1, "subtitle of instruction is required"),
        description: z.string().min(1, "description of instruction is required"),
    })),
    isPublic: z.boolean(),
    forSale:  z.boolean(),
    price: z.coerce.number(),


    imageUrl: z.string().optional(),
     
    imageFile: z.instanceof(File, { message: "image is required" }).optional() // esse campo tem que ser uma instancia de File (arquivo, e ele é opcional
    }).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"]
})

type RecipeFormData = z.infer<typeof formSchema>

type Props = {
    btnText: string;
    onSave: (recipeFormData: FormData) => void;
    isLoading: boolean;
    recipe?: Recipe
}

const ManageRecipeForm = ({ onSave, isLoading, recipe, btnText }: Props) => {
    
    const form = useForm<RecipeFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            prepTime: 0,
            cookTime: 0,
            serving: 0,
            categories: [],
            nutrients: [{calories: 0, protein: 0, fat: 0, carbohydrate: 0}],
            ingredients: [{name: "", quantity: 0, unit: "g"}],
            instructions: [{title: "", description: "", subtitle: ""}],
            price: 0,
            forSale: false,
            isPublic: true,
        }
    })

    useEffect(() => {
        if (!recipe) {
            return;
        }

        const updatedRecipe = {
            ...recipe,
        }

        form.reset(updatedRecipe)
    }, [form, recipe])

    const onSubmit = (formDataJson: RecipeFormData) => {
        const formData = new FormData()
        formData.append("name", formDataJson.name)
        formData.append("description", formDataJson.description)
        formData.append("prepTime", formDataJson.prepTime.toString())
        formData.append("cookTime", formDataJson.cookTime.toString())
        formData.append("serving", formDataJson.serving.toString())

        formData.append("isPublic", formDataJson.isPublic.toString())
        formData.append("forSale", formDataJson.forSale.toString())
        formData.append("price", formDataJson.price.toString())

        formDataJson.categories.forEach((category, index) => {
            formData.append(`categories[${index}]`, category)
        })
        formDataJson.nutrients.forEach((nutrient, index) => {
            formData.append(`nutrients[${index}][calories]`, nutrient.calories.toString())
            formData.append(`nutrients[${index}][fat]`, nutrient.fat.toString())
            formData.append(`nutrients[${index}][protein]`, nutrient.protein.toString())
            formData.append(`nutrients[${index}][carbohydrate]`, nutrient.carbohydrate.toString())
        })
        formDataJson.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name.toString())
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity.toString())
            formData.append(`ingredients[${index}][unit]`, ingredient.unit.toString())
        })
        formDataJson.instructions.forEach((instruction, index) => {
            formData.append(`instructions[${index}][title]`, instruction.title.toString())
            formData.append(`instructions[${index}][subtitle]`, instruction.subtitle.toString())
            formData.append(`instructions[${index}][description]`, instruction.description.toString())
        })

        if (formDataJson.imageFile) { // existe esse campo no nosso formDataJson?
            formData.append(`imageFile`, formDataJson.imageFile) // adicionamos ao formData o campo de Arquivo
        }

        onSave(formData)
    }

    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded'>
                <DetailsSection />
                <Separator />
                <CategorySection />
                <Separator />
                <IngredientsSection />
                <Separator />
                <InstructionsSection />
                <Separator />
                <NutrientsSection />
                <Separator />
                <ImageSection />
                <Separator />
                <SalesSetupSection />
                <Separator />
                <PrivacyRecipeSection />
                <Separator />
                {isLoading ? <LoadingButton /> : <Button className='bg-emerald-900' type="submit">{btnText}</Button>}
            </form>
        </Form>
    )
}


export default ManageRecipeForm;