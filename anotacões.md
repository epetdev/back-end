[] - Model Usuario:

'id'
nome
email
celular
endereco
cpf
senha
status_comercial
*id_loja

[] - Model Loja

'id'
nome
responsavel
cnpj
endereco
celular
*id_produtos
*id_categorias

[] - Model Produtos

'id'
nome
descricao
preco
id_loja

[] - Model Categorias

'id'
nome





const email = decod.email

        try {
            const user = await usuario.findOne({ where: { email } })

            if (user == null) return res.status(400).json({ erro: 'Dados do usuario não encontrados!' })

            return res.json({ user })
        } catch(erro) {
            console.log(erro)
            return res.status(400).json({ erro: 'Erro ao autenticar!' })
        }