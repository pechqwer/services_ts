type Button = {
    'sub-id': string,
    text: string
}

type Action = {
    type: string,
    label: string,
    data: string,
    displayText: string
}

export interface Flow {
    id: string,
    type?: string,
    elements?: object[]
}

export interface Element {
    type: string,
    options: {
        message?: string,
        buttons?: Array<Button>
    }
    order: string
}

export interface TemplateTextButton {
    type: string,
    altText: string,
    template: {
        type: string,
        text: string,
        actions: Action[]
    }
}
