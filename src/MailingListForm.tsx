import "formsmd/dist/css/formsmd.min.css";
import { useEffect, useRef } from "react";
import { Composer, Formsmd } from "formsmd";



const composer = new Composer({
  id: "mailing-list-form",
  postUrl: "/api/mailing-list",
  slideControls: 'show'

  

  
});

composer.startSlide({
  buttonAlignment: 'start',
  buttonText: 'Vamos la'
})

composer.h1('Seja muito bem vindo(a) ao plano Global', {
  classNames: ['text-center']
})

composer.p('Aqui voce irá aprender como vender infoprodutos a nivel global para toda parte do mundoe para mais de 90 paises com estrategia correta e o poder do branding feito com IA ', {
  classNames: ['text-center']
})

composer.slide({
  pageProgress: '25%'
})





// Slide 1 - Nome (progresso: 25%)
composer.textInput("fullName", {
  question: "Qual é o seu nome completo?",
  required: true,
  placeholder: "Nome Completo" ,
  
 
});

// Nova etapa - Slide 2 (progresso: 50%)
composer.slide({
  pageProgress: "17%"
});

composer.emailInput("email", {
  question: "Qual é o seu e-mail {$ name $} ?",
  required: true,
  placeholder: "seu@email.com"
});

// Nova etapa - Slide 3 (progresso: 75%)
composer.slide({
  pageProgress: "25%"
});

//etapa 4 


composer.telInput('phone', {
  question: 'Qual o seu celular ?',
  country: 'BR',
  placeholder:" (55)...."
});


composer.slide({
  pageProgress: '35%'

})

composer.textInput('instagram', {
  question: 'qual seu instagram ?',
  required: true,
  placeholder: 'digite aqui ... ',

})

composer.slide({
  pageProgress: '45%'
})



composer.textInput( 'situation',   {
  question: 'qual sua situação atual ?',
  required: true,
  placeholder: 'digite aqui ... ',
  
  
})

composer.slide({
  pageProgress: '60%'
})

composer.textInput('trabalho', {
  question: 'Você está trabalhando atualmente?',
  required: true,
  placeholder: 'digite aqui ... '
})
composer.slide({
  pageProgress: '75%'
})



composer.choiceInput("interesse", {
  question: "Qual área te interessa mais?",
  choices: [
    { label: "Tecnologia", value: "tecnologia" },
    { label: "Negócios", value: "negocios" },
    { label: " Design", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Outro", value: "outro" }
  ],
  required: true,
  
});

// Nova etapa - Slide 4 (progresso: 100%)
composer.slide({
  pageProgress: "80%"
});



composer.choiceInput("renda", {
  question: "Qual sua renda mensal?",
  choices: [
    { label: "Até R$ 1.000", value: "ate_1000" },
    { label: "R$ 1.000 a R$ 3.000", value: "1k_3k" },
    { label: "R$ 3.000 a R$ 5.000", value: "3k_5k" },
    { label: "Acima de R$ 5.000", value: "acima_5k" }
  ],
  required: true
});

composer.slide({
  pageProgress: "90%"
})

composer.textInput("porque", {
  question: "Porque eu deveria te escolher para participar da nossa Call Estratégica?",
  required: true,
  placeholder: "Responda aqui..."
});

composer.slide({
  pageProgress: "95%"
})


composer.choiceInput("comparecimento", {
  question: "Caso seja escolhido(a), Certeza que ira copmparecer na call ? ",
  choices: [
    { label: "Sim" },
    { label: "Não" }

  ]
})

composer.slide({
  pageProgress: "100%"
})

composer.h1('Obrigado por Preencher em breve entro em contato !',{
  classNames: ['text-center']
})


export default function MailingListForm() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const formsmd = new Formsmd(composer.template, containerRef.current, {
        postHeaders: {
          Authorization: `Basic ${import.meta.env.VITE_PUBLIC_API_KEY}`,
        },
        formsmdBranding: "hide",
        isFullPage: false,
        footer: "hide"
        
      });
      formsmd.init();

      // Auto-avançar quando clicar em uma escolha (estilo Typeform)
      const handleChoiceClick = () => {
        setTimeout(() => {
          const nextButton = containerRef.current?.querySelector('[data-slidecontrols-next]') as HTMLButtonElement;
          if (nextButton && !nextButton.disabled) {
            nextButton.click();
          }
        }, 600); // Delay para dar feedback visual
      };

      // Adicionar listener aos botões de escolha
      const observeChoices = () => {
        const choiceInputs = containerRef.current?.querySelectorAll('input[type="radio"]');
        choiceInputs?.forEach((input) => {
          input.addEventListener('change', handleChoiceClick);
        });
      };

      // Observar mudanças no DOM para adicionar listeners quando novos slides aparecerem
      const observer = new MutationObserver(observeChoices);
      if (containerRef.current) {
        observer.observe(containerRef.current, { childList: true, subtree: true });
      }

      // Adicionar listeners iniciais
      setTimeout(observeChoices, 500);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        padding: "0 8px"
      }}
    />
  );
}
