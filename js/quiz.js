function Quiz(questions) {
			this.score= 0;
			this.questions= questions;
			this.currentQuestionIndex= 0;
		}

		Quiz.prototype.guess= function(answer) {
			if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
				this.score++;
			}
			this.currentQuestionIndex++;
		}

		Quiz.prototype.getCurrentQuestion= function() {
			return this.questions[this.currentQuestionIndex];
		};

		Quiz.prototype.hasEnded= function() {
			return this.currentQuestionIndex >= this.questions.length;
		};

		function Question(text, choices, answer) {
			this.text= text;
			this.choices= choices;
			this.answer= answer;
		}

		Question.prototype.isCorrectAnswer= function(choice) {
			return this.answer === choice;
		};

		var QuizUI= {
			displayNext: function() {
				if(quiz.hasEnded()) {
					this.displayScore();
				} else {
					this.displayQuestion();
					this.displayChoices();
					this.displayProgress();
				}
			},
			displayQuestion: function() {
				this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
			},
			displayChoices: function() {
				var choices= quiz.getCurrentQuestion().choices;

				for(var i= 0; i < choices.length; i++) {
					this.populateIdWithHTML("choice" + i, choices[i]);
					this.guessHandler("guess" + i, choices[i]);
				}
			},
			displayScore: function() {
				var gameOverHTML= "";
				if(quiz.score == 20) {
					gameOverHTML += "<h1 class='title-congrats'>Parabéns, você acertou todas</h1>";
				    gameOverHTML += "<h2 class='score'>Sua pontuação é: " + quiz.score + "</h2>";

				}
				else if(quiz.score >= 13 && quiz.score < 20) {
					gameOverHTML += "<h1 class='title-congrats'>Parabéns, você sabe muito</h1>";
				    gameOverHTML += "<h2 class='score'>Sua pontuação é: " + quiz.score + "</h2>";

				} else {
					gameOverHTML += "<h1 class='title-congrats'>Parabéns, continue estudando e vai melhorar =)</h1>";
				    gameOverHTML += "<h2 class='score'>Sua pontuação é: " + quiz.score + "</h2>";
				}
				
				var botao= document.createElement("button");
				botao.innerHTML= "Refazer";
				botao.classList.add("btn");
				botao.classList.add("btn-reload");

				document.body.appendChild(botao);

				botao.addEventListener("click", function() {
					window.location.reload();
				});

				this.populateIdWithHTML("quiz", gameOverHTML);
			},
			populateIdWithHTML: function(id, text) {
				var element= document.getElementById(id);
				element.innerHTML= text;
			},
			guessHandler: function(id, guess) {
				var button= document.getElementById(id);
				button.onclick= function() {
					quiz.guess(guess);
					QuizUI.displayNext();
				}
			},
			displayProgress: function() {
				var currentQuestionNumber= quiz.currentQuestionIndex + 1;
				this.populateIdWithHTML("progress", "Pergunta" + currentQuestionNumber + " de " + quiz.questions.length);
			}
		};

		//Create Questions
var questions = [
    new Question("Qual é a declaração DOCTYPE HTML5 correta ?", [ "< !DOCTYPE html>", "< !DOCTYPE html5>", "< DOCTYPE html>", "< DOCTYPE html5>" ], "< !DOCTYPE html>"),
    new Question("Qual é o atributo em IMG tag para especificar o URL da imagem?", ["link","rel", "src", "href"], "src"),
    new Question("Qual destes elementos é um elemento inline?", ["div","img", "p", "li"], "img"),
    new Question("Qual é a tag que é usada para carregar folha de estilo externa?", ["link","style", "script", "css"], "link"),
    new Question("Que propriedade é usada para o texto flutuar em torno de uma imagem?", ["display","float", "position", "z-index"], "float"),
    new Question("Qual destes é o seletor universal em CSS.", ["*","@", "#", "&"], "*"),
    new Question("Qual destes valores não é um valor válido para a propriedade 'float'", ["left","right", "inherit", "top"], "top"),
    new Question("function teste() {alert (a); var a = 10; }. Qual o valor do alert dessa função quando for chamada?", ["10","undefined", "a", "nada"], "undefined"),
    new Question("O que é Flexbox?", ["É um modo de layout prevê a disposição dos elementos","Como o navegador interpreta CSS", "Framework CSS", "A estrutura de animação CSS"], "É um modo de layout prevê a disposição dos elementos"),
    new Question("Por que é melhor usar translate() ao invés de position: absolute top/right/bottom/left ?", ["Melhor desempenho","Mais fácil de usar", "Mais suporte ao navegador", "position: absolute só é suportado em navegadores antigos"], "Melhor desempenho"),
    new Question("Como se cria um nó DOM com JavaScript?", ["document.createElement();","document.createNewElement();", "window.createElement();", "createAElement();"], "document.createElement();"),
    new Question("O que é uma função em JavaScript?", ["Uma função é um bloco de código projetado para executar uma tarefa","Um método de cálculo", "As bibliotecas ou frameworks adicionados a um projeto", "Uma ferramenta para escrever JavaScript"], "Uma função é um bloco de código projetado para executar uma tarefa"),
    new Question("Qual é a diferença entre sessionStorage e localStorage", ["localStorage armazena dados sem data de expiração","sessionStorage só pode ser usado uma vez", "sessionStorage detém mais dados", "Não há nenhuma diferença e ambos realizam a mesma coisa"], "localStorage armazena dados sem data de expiração"),
    new Question("Qual é a diferença entre classes e IDs em CSS ?", ["IDs só pode ser usado uma vez no HTML","IDs só podem ser acessados ​​por JavaScript", "Classes só podem ser aplicadas em elementos filhos", "Classes não funcionam em todos os browsers"], "IDs só pode ser usado uma vez no HTML"),
    new Question("Pra que serve o clearfix em CSS ?", ["Corrige problemas relacionados com a flutuação de elementos filho em um elemento pai","Remove elementos do DOM", "Oculta o conteúdo fora da tela", "Usado para rolagem contínua"], "Corrige problemas relacionados com a flutuação de elementos filho em um elemento pai"),
    new Question("Em JavaScript, quando uma variável é undefined?", ["Quando uma variável não tem um valor definido","Uma variável não pode nunca ser undefined", "Quando a variável existe e é definida como null", "Quando uma variável não é declarada com 'var'"], "Quando uma variável não tem um valor definido"),
    new Question("O que significa AJAX ?", ["Asynchronous JavaScript and XML","Alternative JavaScript Action XML", "Accessible XML", "Nenhuma das opções acima"], "Asynchronous JavaScript and XML"),
    new Question("Quais problemas uma single page application pode ter ?", ["Pode causar problemas de SEO","Não tem número suficiente de páginas", "Pode ter problemas de HTML", "Pode causar erros de validação do W3C"], "Pode causar problemas de SEO"),
    new Question("Como closures funcionam no JavaScript ?", ["Uma função dentro de outra função, a função interna tem acesso a variáveis ​​na função exterior","JavaScript não usa closures", "É uma maneira de fechar uma função em JavaScript", "Nenhuma das alternativas"], "Uma função dentro de outra função, a função interna tem acesso a variáveis ​​na função exterior"),
     new Question("O que é WAI-ARIA?", ["Web Accessibility Initiative - Accessible Rich Internet Applications","Um padrão web", " Um grupo que se concentra em ajudar os tempos de carregamento do navegador", "Nenhuma das alternativas"], "Web Accessibility Initiative - Accessible Rich Internet Applications")

];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();