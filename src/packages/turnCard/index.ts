import { Plugin, App } from 'vue'
import TurnCard from './src/components/turn-card'
import Card from './src/components/card'

TurnCard.Card = Card

TurnCard.install = function(app: App) {
  app.component(TurnCard.name, TurnCard)
  app.component(TurnCard.Card.name, TurnCard.Card)
  return app
}

export default TurnCard as typeof TurnCard &
  Plugin & {
    readonly Card: typeof Card
  }

export { TurnCard, Card }
