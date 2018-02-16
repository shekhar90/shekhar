export class Question {
    id: string;
    questionType: string;
    difficulty: string;
    question: string;
    options: {
        o1: string,
        o2: string,
        o3: string,
        o4: string
    };
    answer: string;
}
