import java.util.ArrayList;
import java.util.Collections;
import java.util.NoSuchElementException;

public class Deck{
    protected ArrayList<String> contents;
    public int size;
    private int index;

    public Deck() {
        this(new ArrayList<String>());
    }

    public Deck (ArrayList<String> contents){
        this.contents = contents;
        this.size = contents.size();
        this.index = 0;
    }

    public void Shuffle() {
        Collections.shuffle(contents);
        index = 0;
    }

    public String GetNextCard() throws NoSuchElementException{
        if (index == size){
            throw new NoSuchElementException("The Entire deck has been dealt");
        }

        String rval = contents.get(index);
        index++;
        return rval;
    }

}
