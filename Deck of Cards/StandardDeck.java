import java.util.ArrayList;
public class StandardDeck extends Deck {

    public StandardDeck() {
        super();
        String[] values = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"};
        String[] suits = {"Spades", "Hearts", "Clubs", "Diamonds"};
        for (String suit : suits){
            for (String value : values){
                    this.contents.add(value + " of " + suit);
            }
        }
        this.size = 52;
    }
}
