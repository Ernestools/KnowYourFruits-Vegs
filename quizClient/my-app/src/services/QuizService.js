import { properties } from '../properties';
import axios from "axios";

export class QuizService {

    static instance = null;

    constructor() {
        this.questions = [];
        this.answers = {};
    }

    static async getInstance() {
        if(QuizService.instance != null)
            return QuizService.instance;
        QuizService.instance = new QuizService();
        await QuizService.instance.fetchQuestionsAndChoices();
        return QuizService.instance;
    }

    async fetchQuestionsAndChoices() {
        this.questions = await this.getAllQuestions();
        this.answers = await this.getAllChoices();
    }

    async getAllQuestions() {
        try {
            if(this.questions && this.questions.length > 0)
                return this.questions;

            const response = await axios.get(properties.ServerBasePath+properties.questionsUrl);
            console.warn(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching questions:", error);
            return [];
        }
    }

    async getAllChoices() {
        try {
            if(this.answers && this.answers.length > 0)
                return this.answers;

            const response = await axios.get(properties.ServerBasePath+properties.choicesUrl);
            console.warn(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching choices:", error);
            return {};
        }
    }

    getAnswersExcept(id, count) {
        const filteredChoices = Object.entries(this.answers).filter(([key]) => key !== id);        
        const shuffledChoices = filteredChoices.sort(() => Math.random() - 0.5);
        return shuffledChoices.slice(0, count).map(([_, value]) => value);
    }
}

export default QuizService;
