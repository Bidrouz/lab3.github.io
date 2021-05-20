const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz {
  constructor(type, questions, results) {
    this.type = type;
    
    this.questions = questions;
    
    this.results = results;
    
    this.score = 0;
    
    this.result = 0;
    
    this.current = 0;
  }
  
  Click(index) {
    let value = this.questions[this.current].Click(index);
    this.score += value;
    
    let correct = -1;
    
    if (value >= 1) {
      correct = index;
    } else {
      for (let i = 0; i < this.questions[this.current].answers.length; i++) {
        if (this.questions[this.current].answers[i].value >= 1) {
          correct = i;
          break;
        }
      }
    }
    
    this.Next();
    
    return correct;
  }
  
  Next() {
    this.current++;
    
    if (this.current >= this.questions.length) {
      this.End();
    }
  }
  
  End() {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].Check(this.score)) {
        this.result = i;
      }
    }
  }
}

class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }
  
  Click(index) {
    return this.answers[index].value;
  }
}

class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}

class Result {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
  
  Check(value) {
    return this.value <= value;
  }
}

const results =
  [
    new Result("Вам многому нужно научиться", 0),
    new Result("Вы уже неплохо разбираетесь", 4),
    new Result("Ваш уровень выше среднего", 7),
    new Result("Вы в совершенстве знаете тему", 10)
  ];

const questions =
  [
    new Question("By default, ASP.NET store SessionIDs in",
      [
        new Answer("Cookies", 1),
        new Answer("Cache", 0),
        new Answer("Database", 0),
        new Answer("Global variable", 0)
      ]),
    
    new Question("Which of the following languages can be used to write server side scripting in ASP.NET?",
      [
        new Answer("C-sharp", 0),
        new Answer("VB", 0),
        new Answer("C++", 0),
        new Answer("a and b", 1)
      ]),
  
    new Question("Choose the form in which Postback occur?",
      [
        new Answer("HTMLForms", 0),
        new Answer("Webforms", 1),
        new Answer("WinformsAnswer", 0),
      ]),
  
    new Question("What is the purpose of code behind ?",
      [
        new Answer("To separate different sections of a page in to different files", 0),
        new Answer("To merge HTML layout and code in to One file", 0),
        new Answer("To separate HTML Layout and code to different file", 1),
        new Answer("To ignore HTML usage", 0)
      ]),
    
    new Question("Which one of the following is the last stage of the Web forms lifecycle?",
      [
        new Answer("Which one of the following is the last stage of the Web forms lifecycle?", 0),
        new Answer("Event Handling", 0),
        new Answer("Page_Init", 1),
        new Answer("Page_Unload", 0)
      ]),
    
    new Question("When an .aspx page is requested from the web server, the out put will be rendered to browser in following format.",
      [
        new Answer("HTML", 1),
        new Answer("XML", 0),
        new Answer("WML", 0),
        new Answer("JSP", 0)
      ]),
  
    new Question("Which of the following object is not an ASP component?",
      [
        new Answer("LinkCounter", 1),
        new Answer("Counter", 0),
        new Answer("AdRotator", 0),
        new Answer("File Access", 0)
      ]),
  
    new Question("Which objects is used to create foreign key between tables?",
      [
        new Answer("DataRelationship", 0),
        new Answer("DataRelation", 1),
        new Answer("DataConstraint", 0),
        new Answer("Datakey", 0)
      ]),
  
    new Question("Which of the following base class do all Web Forms inherit from?",
      [
        new Answer("Window class", 0),
        new Answer("Web  class", 0),
        new Answer("Page class", 1),
        new Answer("Form class", 0)
      ]),
  
    new Question("The Asp.net server control, which provides an alternative way of displaying text on web page, is",
      [
        new Answer("< asp:label >", 1),
        new Answer("< asp:listitem >", 0),
        new Answer("< asp:button >", 0),
      ]),
  ];

const quiz = new Quiz(1, questions, results);

Update();

function Update() {
  if (quiz.current < quiz.questions.length) {
    headElem.innerHTML = quiz.questions[quiz.current].text;
    
    buttonsElem.innerHTML = "";
    
    for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
      let btn = document.createElement("button");
      btn.className = "button";
      
      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;
      
      btn.setAttribute("index", i);
      
      buttonsElem.appendChild(btn);
    }
    
    pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;
    
    Init();
  } else {
    buttonsElem.innerHTML = "";
    headElem.innerHTML = quiz.results[quiz.result].text;
    pagesElem.innerHTML = "Очки: " + quiz.score;
  }
}

function Init() {
  let btns = document.getElementsByClassName("button");
  
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}

function Click(index) {
  let correct = quiz.Click(index);
  
  let btns = document.getElementsByClassName("button");
  
  for (let i = 0; i < btns.length; i++) {
    btns[i].className = "button button_passive";
  }
  
  if (quiz.type === 1) {
    if (correct >= 0) {
      btns[correct].className = "button button_correct";
    }
    
    if (index !== correct) {
      btns[index].className = "button button_wrong";
    }
  } else {
    btns[index].className = "button button_correct";
  }
  
  setTimeout(Update, 1000);
}
