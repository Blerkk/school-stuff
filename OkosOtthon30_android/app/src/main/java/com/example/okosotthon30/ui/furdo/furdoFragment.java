package com.example.okosotthon30.ui.furdo;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import com.example.okosotthon30.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import androidx.annotation.DrawableRes;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class furdoFragment extends Fragment {

    FirebaseDatabase database;
    DatabaseReference myref;

    private furdoViewModel furdoViewModel;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflanter, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState){
        //homersekletLekeresFurdo();
        ablakLekeresFurdo();

        return inflanter.inflate(R.layout.fragment_furdo, container, false);
    }

    public void homersekletLekeresFurdo() {

        myref = FirebaseDatabase.getInstance().getReference("FURDO/TEMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Double furdoHomerseklet = dataSnapshot.getValue(Double.class);

                TextView furdoHomer = (TextView) getActivity().findViewById(R.id.homersekletTextFurdo);
                furdoHomer.setText(furdoHomerseklet + " °C");
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void lampaAllapotLekeresFurdo() {
        myref = FirebaseDatabase.getInstance().getReference("FURDO/LAMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean lampaAllapotFurdo = dataSnapshot.getValue(Boolean.class);

                ImageView furdoLampaAllapot = (ImageView) getActivity().findViewById(R.id.image);

                if (lampaAllapotFurdo == false) {
                    //felkapcsolas icon
                } else {
                    //
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void ablakLekeresFurdo() {
        myref = FirebaseDatabase.getInstance().getReference("FURDO/WINDOW");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean furdoAblak = dataSnapshot.getValue(Boolean.class);

                TextView furdoAblakStatus = (TextView) getActivity().findViewById(R.id.ablakAllapotFurdo);

                if (furdoAblak == true) {
                    furdoAblakStatus.setText("Az ablak nyitva van!");
                } else {
                    furdoAblakStatus.setText("Az ablak be van csukva!");
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }
}