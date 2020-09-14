package com.example.okosotthon30.ui.etkezo;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class etkezoViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public etkezoViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("");
    }

    public LiveData<String> getText() {
        return mText;
    }
}