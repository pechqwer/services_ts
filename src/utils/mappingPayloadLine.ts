import queryString from 'query-string'
import { Flow, Element, TemplateTextButton} from '../type/index'

export class mappingPayloadLine {
  private flows: Array<Flow>
  private id?: string | null

  constructor(flows: Array<Flow>, id?: string | null) {
    this.flows = flows
    this.id = queryString.parse(id!!).action as string
  }

  private mapping(elements?: Array<Element>) {
    if (!elements) return null
    if (elements.length <= 0) return null
    const arrayMap: object[] = []
    for (const data of elements) {
      switch (data.type) {
        case 'text':
          if (data.options.buttons && data.options.buttons.length > 0) {
            const temp: TemplateTextButton = {
              type: 'template',
              altText: data.options.message!!,
              template: {
                type: 'buttons',
                text: data.options.message!!,
                actions: []
              }
            }
            for (const button of data.options.buttons!!) {
              temp.template.actions.push({
                type: 'postback',
                label: button.text,
                displayText: button.text,
                data: `action=${button['sub-id']}`
              })
            }
            arrayMap.push(temp)
            
          } else {
            arrayMap.push({
              type: data.type,
              text: data.options.message
            })
          }

          break;

        default:
          break;
      }
    }
    console.log(JSON.stringify(arrayMap))
    return arrayMap
  }

  public findStart(): any {
    const flowStart = this.flows.find(f => f.type === 'start')
    if (!flowStart) return null

    const elements: Array<Element> = flowStart?.elements as Array<Element>

    const mappingLine = this.mapping(elements)
    return mappingLine
  }

  public findNext(): any {
    const flowNext = this.flows.find(f => f.id === this.id)
    if (!flowNext) return null

    const elements: Array<Element> = flowNext?.elements as Array<Element>

    const mappingLine = this.mapping(elements)
    return mappingLine
  }
}