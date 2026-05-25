import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFileListData } from "@/hooks/useData"
import { useRegisterMutate, useUploadFileMutate } from "@/hooks/useMutate"

const formSchema = z.object({
  acronym: z
    .string()
    .min(3, "Sigla é obrigatória")
    .max(3, "Máximo 3 caracteres"),
  name: z.string().max(60, "Máximo 60 caracteres"),
  version: z
    .string()
    .min(10, "Informe versão com 10 caracteres")
    .max(10, "Informe versão com 10 caracteres"),
})

export type FormValues = z.infer<typeof formSchema>

export default function FormPage() {
  const { mutate: registerMutate, isPending: loading } = useRegisterMutate()
  const { mutate: uploadFileMutate, isPending: enviando } =
    useUploadFileMutate()
  const { data: version = [] } = useFileListData()
  const [arquivo, setArquivo] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acronym: "",
      name: "",
      version: "",
    },
  })

  function onSubmitCadastro(values: FormValues) {
    registerMutate(values, {
      onSuccess: () => {
        reset()
        toast.success("Registro salvo com sucesso!")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  async function enviarArquivo(event: React.FormEvent) {
    event.preventDefault()

    if (!arquivo) {
      toast.warning("Selecione um arquivo")
      return
    }

    uploadFileMutate(arquivo, {
      onSuccess: () => {
        setArquivo(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        toast.success("Arquivo enviado com sucesso.")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <div className="flex justify-center gap-2 p-6 select-none">
      <Card className="min-w-3xs">
        <CardHeader>
          <CardTitle>Registrar</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para salvar o registro.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmitCadastro)}
            className="grid gap-5"
          >
            <Field>
              <FieldLabel htmlFor="sigla">Sigla</FieldLabel>
              <Input id="sigla" maxLength={3} {...register("acronym")} />
              <FieldError>{errors.acronym?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="nome">Nome</FieldLabel>
              <Input id="nome" {...register("name")} />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="versao">Versão</FieldLabel>
              <Controller
                name="version"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="versao">
                      <SelectValue placeholder="Selecione uma versão" />
                    </SelectTrigger>

                    <SelectContent>
                      {version.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <FieldError>{errors.version?.message}</FieldError>
            </Field>

            <Button type="submit" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="min-w-3xs">
        <CardHeader>
          <CardTitle>Arquivo de Atualização</CardTitle>
          <CardDescription>
            Envie o pacote de atualização do sistema.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="grid gap-4" onSubmit={enviarArquivo}>
            <div className="grid gap-2">
              <label htmlFor="arquivo" className="text-sm font-medium">
                Arquivo
              </label>

              <Input
                id="arquivo"
                type="file"
                ref={fileInputRef}
                accept=".zip"
                disabled={enviando}
                onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
              />
            </div>

            <Button type="submit" disabled={enviando || !arquivo}>
              {enviando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Atualização"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
