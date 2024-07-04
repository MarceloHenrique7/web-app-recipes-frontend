import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod'
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Search } from 'lucide-react';
import { Input } from '@mui/material';
import { Button } from './ui/button';


const formSchema = z.object({ // criamos um schema de validação para a nossa searchQuery
    searchQuery: z.string({ // aqui definimos que searchQuery e do tipo string
        required_error: "Restaurant name is required" // caso esse campo seja vazio retornamos um erro que required_error com essa mensagem, isso significa que o user não digitou nada no campo
    }),
})


export type SearchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string;
}

const SearchBar = ({ onSubmit, placeHolder, onReset, searchQuery }: Props) => {
  
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        searchQuery
    }
  })

  

  useEffect(() => {
    form.reset({ searchQuery })
    
  }, [form, searchQuery])


  const handleReset = () => {
    form.reset({
        searchQuery: ""
    })
    

    if(onReset) {
        onReset();
    }
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center gap-3 justify-between flex-row border-2 w-full rounded-full p-3 ${form.formState.errors.searchQuery && "border-red-500"}`}>
            <Search strokeWidth={2.5} size={30} className='ml-1 text-emerald-500 hidden md:block'/>
            <FormField  
                control={form.control} 
                name="searchQuery" 
                render={({ field }) => 
                <FormItem className="flex-1">
                    <FormControl>
                        <Input {...field}  className={`border-none w-full shadow-none text-x1 focus-visible:ring-0`} placeholder={placeHolder}/>
                    </FormControl>
                </FormItem>}
            />
            <Button
                onClick={handleReset}
                type="button"
                variant="outline"
                className="rounded-full"
            >
                Reset
            </Button>
            <Button type="submit" className='rounded-full hover:bg-emerald-900 bg-emerald-500'>
                Search
            </Button>
        </form>
    </Form>
  )
}

export default SearchBar